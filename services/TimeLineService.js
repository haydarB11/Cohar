const { TimeLine, Level, Quiz, Course, QuizStudent } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class TimeLineService {

    constructor(data) {
        this.order = data.order;
        this.course_id = data.course_id;
        this.quiz_id = data.quiz_id;
        this.level_id = data.level_id;
        this.available = data.available;
    }

    static async addAll(data) {
        try {
            const timeLine = await TimeLine.bulkCreate(data);
            return {
                data: timeLine,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getById(timeline_id) {
        try {
            let timeline = await TimeLine.findOne({
                attributes: [
                    'order'
                ],
                where: {
                    id: timeline_id
                }
            });
            return {
                data: timeline,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getByListOfQuizAndLevel(level_ids, quiz_ids) {
        try {
            let timeline = await TimeLine.findAll({
                attributes: [
                    'id'
                ],
                where: {
                    [Op.or]: [
                        {
                            level_id: {
                                [Op.in]: level_ids
                            },
                        },
                        {
                            quiz_id: {
                                [Op.in]: quiz_ids
                            }
                        }
                    ]
                }
            });
            return {
                data: timeline,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async edit(data, t) {
    try {
            let timeLine;
            timeLine = await TimeLine.findOne({
                where: {
                    course_id: data.course_id,
                    level_id: data.level_id,
                    quiz_id: data.quiz_id,
                }
            },);
            if (timeLine) {
                timeLine.order = data.order;
                await timeLine.save();
            } else {
                timeLine = await TimeLine.create({
                    course_id: data.course_id,
                    level_id: data.level_id,
                    quiz_id: data.quiz_id,
                    order: data.order,
                    available: data.available,
                    manager_id: data.manager_id
                },);
            }
            return {
                data: timeLine,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async deleteAllForOneCourse(course_id) {
        try {
            const deletedTimeLine = await TimeLine.destroy({
                where: {
                    course_id: course_id
                }
            });
            return {
                data: 'deleted',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async deleteManyFromOldTimeline(course_id, level_ids, quiz_ids) {
        try {
            const deletedTimeLine = await TimeLine.destroy({
                where: {
                    [Op.or]: [
                        {
                            level_id: {
                                [Op.notIn]: level_ids
                            },
                            quiz_id: null,
                        },
                        {
                            quiz_id: {
                                [Op.notIn]: quiz_ids
                            },
                            level_id: null,
                        }
                    ],
                    course_id: course_id,
                }
            });
            return {
                data: deletedTimeLine,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async get(course_id) {
        try {
            const timeLine = await TimeLine.findAll({
                include: [
                    {
                        required: false,
                        model: Level,
                        as: 'level',
                    },
                    {
                        required: false,
                        model: Quiz,
                        as: 'quiz',
                    },
                    {
                        model: Course,
                        as: 'course',
                    }
                ],
                where: {
                    course_id: course_id
                },
                order: [['order', 'ASC']]
            });
            return {
                data: timeLine,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getForOneUser(data) {
        try {
            const timeLine = await TimeLine.findAll({
                include: [
                    {
                        required: false,
                        model: Level,
                        as: 'level',
                        where: {
                            course_id: data.course_id
                        },
                    },
                    {
                        required: false,
                        model: Quiz,
                        as: 'quiz',
                        where: {
                            course_id: data.course_id
                        },
                        include: [
                            {
                                required: false,
                                model: QuizStudent,
                                as: 'quiz_students',
                                where: {
                                    user_id: data.student_id
                                }
                            }
                        ]
                    },
                    {
                        model: Course,
                        as: 'course',
                    }
                ],
                where: {
                    course_id: data.course_id
                },
                order: [['order', 'ASC']]
            });
            return {
                data: timeLine,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getFirstQuiz(course_id) {
        try {
            const timeLine = await TimeLine.findOne({
                where: {
                    level_id: null,
                    course_id: course_id
                },
                order: [['order', 'ASC']]
            });
            return {
                data: timeLine,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getFutureQuiz(data) {
        try {
            const timeLine = await TimeLine.findOne({
                where: {
                    level_id: null,
                    course_id: data.course_id,
                    order: {
                        [Op.gt]: data.order
                    }
                },
            });
            return {
                data: timeLine,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getLastNodeOnTimeline(course_id) {
        try {
            const timeLine = await TimeLine.findOne({
                where: {
                    course_id: course_id,
                },
                order: [['order', 'DESC']]
            });
            return {
                data: timeLine,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async editAvailable(data) {
        try {
            const timeLine = await TimeLine.update({available: data.available }, {
                where: {
                    id: {
                        [Op.in]: data.ids
                    },
                },
            });
            return {
                data: timeLine,
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

module.exports = { TimeLineService }; 