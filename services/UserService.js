const { User, Code, Quiz, QuizStudent, Course, Message, StudentPin, TimeLine } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');
const { UniqueValuesFromArrayOfJson } = require('../utils/helper/ArrayHelper');

class UserService {

    constructor(data) {
        this.name = data.name;
        this.user = data.user;
        this.password = data.password;
        this.loggedIn = data.loggedIn;
        this.phone = data.phone;
        this.gender = data.gender;
        this.age = data.age;
        this.type = data.type;
    }

    async add() {
        try {
            const user = await User.create(this);
            return {
                data: user,
                status: httpStatus.OK
            };
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                return {
                    data: error.errors.map((err) => {
                        return {
                            name: err.path,
                            message: err.message
                        }
                    }),
                    status: httpStatus.BAD_REQUEST
                }
            } else {
                return {
                    data: error,
                    status: httpStatus.BAD_REQUEST
                };
            }
        }
    }

    static async getToken(body) {
        try {
            const user = await User.update({
                token: body.token
            }, {
                where: {
                    id: body.user_id
                }
            });
            return {
                data: "success",
                status: httpStatus.OK
            }
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.INTERNAL_SERVER_ERROR
            }
        }
    }

    static async getTokenFromDataBase() {
        try {
            let tokens = await User.findAll({
                attributes: ['token'],
                where: {
                    token: {
                        [Op.not]: null
                    }
                }
            });
            tokens = tokens.map(item => item.token);
            return tokens;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async splitTokens(tokens, chunkSize) {
            const chunks = [];
            let i = 0;
            while (i < tokens.length) {
                chunks.push(tokens.slice(i, (i += chunkSize)));
            }
            return chunks;
    }

    static async getAllInSpecificPins(course_id, level_ids, quiz_ids) {
        try {
            const user = await User.findAll({
                include: [
                    {
                        required: true,
                        model: StudentPin,
                        as: 'student_pins',
                        include: [
                            {
                                required: true,
                                model: TimeLine,
                                as: 'time_line',
                                where: {
                                    level_id: {
                                        [Op.notIn]: level_ids
                                    },
                                    quiz_id: {
                                        [Op.notIn]: quiz_ids
                                    },
                                    course_id: course_id
                                }
                            }
                        ]
                    }
                ]
            });
            return {
                data: user,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllStudentsWithMarksForOneCourse(course_id) {
        try {
            const user = await User.findAll({
                include: [
                    {
                        required: true,
                        attributes: [],
                        model: Code,
                        as: 'codes',
                        where: {
                            course_id: course_id
                        }
                    },
                    {
                        model: QuizStudent,
                        as: 'quiz_students',
                        include: [
                            {
                                model: Quiz,
                                as: 'quiz'
                            }
                        ]
                    }
                ],
                where: {
                    type: 'user'
                }
            });
            return {
                data: user,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async get(user_id) {
        try {
            const user = await User.findOne({
                where: {
                    id: user_id
                }
            });
            return {
                data: user,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllWithNoPins(course_id) {
        try {
            let users = await User.findAll({
                include: [
                    {
                        required: false,
                        model: StudentPin,
                        as: 'student_pins',
                    },
                    {
                        required: true,
                        model: Code,
                        as: 'codes',
                        where: {
                            course_id: course_id
                        }
                    }
                ]
            });
            if (users) {
                users = users.filter(user => user.student_pins.length == 0);
            }
            return {
                data: users,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllWithAttemptsOnly() {
        try {
            const user = await User.findAll({
                order: [['id', 'DESC']]
            });
            return {
                data: user,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllManagersForEnrolledCourses(user_id) {
        try {
            const users = await User.findAll({
                attributes: [
                    'id',
                    'name',
                ],
                include: [
                    {
                        required: true,
                        model: Course,
                        as: 'courses',
                        include: [
                            {
                                required: true,
                                attributes: [],
                                model: Code,
                                as: 'codes',
                                where: {
                                    user_id: user_id
                                }
                            }
                        ]
                    }
                ]
            });
            return {
                data: users,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllManagersForEnrolledCoursesWhichHaveMessages(user_id) {
        try {
            const users1 = await User.findAll({
                attributes: [
                    'id',
                    'name',
                ],
                include: [
                    {
                        attributes: [],
                        required: true,
                        model: Message,
                        as: 'sent_messages',
                        where: {
                            receiver_id: user_id,
                        }
                    },
                ],
            });
            const users2 = await User.findAll({
                attributes: [
                    'id',
                    'name',
                ],
                include: [
                    {
                        attributes: [],
                        required: true,
                        model: Message,
                        as: 'received_messages',
                        where: {
                            sender_id: user_id,
                        }
                    },
                ],
            });
            const users = [...users1, ...users2];
            const uniqueUsers = UniqueValuesFromArrayOfJson(users);
            return {
                data: uniqueUsers,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async studentWithCompletedTimelineNode(timeline_id) {
        try {
            const users = await User.findAll({
                attributes: [
                    'id',
                    'name',
                ],
                include: [
                    {
                        required: true,
                        model: StudentPin,
                        as: 'student_pins',
                        where: {
                            timeline_id: timeline_id,
                            is_completed: true,
                        },
                    },
                ],
            });
            return {
                data: users,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllWithPinsForOneCourse(course_id) {
        try {
            const users = await User.findAll({
                attributes: [
                    'id',
                    'name',
                ],
                include: [
                    {
                        required: true,
                        model: StudentPin,
                        as: 'student_pins',
                        include: [
                            {
                                required: true,
                                model: TimeLine,
                                as: 'timeline',
                                where: {
                                    course_id: course_id
                                }
                            }
                        ]
                    },
                ],
                order: [[{ model: StudentPin, as: 'student_pins' }, 'id', 'DESC']]
            });
            return {
                data: users,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async managerLogin(data) {
        try {
            const user = await User.findOne({
                where: {
                    user: data.user,
                }
            });
            if (!user || user.type === "user") {
                return {
                    data: 'User Not Found',
                    status: httpStatus.NOT_FOUND
                };
            } else if (data.phone !== user.phone) {
                return {
                    data: 'Invalid phone',
                    status: httpStatus.NOT_FOUND
                };
            } else {
                return {
                    data: {
                        token: user.generateToken(),
                        data: user
                    },
                    status: httpStatus.OK
                };
            }
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async userLogin(data) {
        try {
            const user = await User.findOne({
                where: {
                    user: data.user,
                }
            });
            if (!user || user?.type === "manager" || user?.type === "supervisor") {
                return {
                    data: 'User Not Found',
                    status: httpStatus.NOT_FOUND
                };
            } else if (user?.loggedIn) {
                return {
                    data: 'this account is opened on other device',
                    status: httpStatus.FORBIDDEN
                }
            } else if (data.password !== user.password) {
                return {
                    data: 'Invalid password',
                    status: httpStatus.NOT_FOUND
                }
            } else {
                user.loggedIn = true;
                await user.save();
                return {
                    data: {
                        token: user.generateToken(),
                        data: user
                    },
                    status: httpStatus.OK
                }
            }
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async edit(data) {
        try {
            const user = await User.findByPk(data.id);
            user.name = data.name || user.name;
            user.user = data.user || user.user;
            user.phone = data.phone || user.phone;
            user.age = data.age || user.age;
            user.password = data.password || user.password;
            user.type = data.type || user.type;
            await user.save();
            return {
                data: 'updated',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async delete(user_id) {
        try {
            const user = await User.destroy({
                where: {
                    id: user_id
                }
            });
            if (user == 1) {
                return {
                    data: 'deleted',
                    status: httpStatus.OK
                };
            } else {
                return {
                    data: 'something went wrong',
                    status: httpStatus.BAD_REQUEST
                };
            }
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async increaseNumberOfIllegalAttempts(user_id) {
        try {
            const user = await User.findByPk(user_id);
            user.number_of_illegal_attempts += 1;
            await user.save();
            return {
                data: 'updated',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

}

module.exports = { UserService };