const { Course, Comment, TimeLine, Code, User, StartingQuiz } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class CourseService {

    constructor(data) {
        this.name = data.name;
        this.photo = data.photo;
        this.description = data.description;
        this.manager_id = data.manager_id;
    }

    async add() {
        try {
            const course = await Course.create(this);
            return {
                data: course,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAll(data) {
        try {
            let courses = await Course.findAll({
                include: [
                    {
                        model: Comment,
                        as: 'comments'
                    },
                    {
                        model: StartingQuiz,
                        as: 'starting_quiz'
                    }
                ]
            });
            if (data?.manager_id) {
                courses = courses.filter(course => course.manager_id === data.manager_id);
            }
            return {
                data: courses,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllWithTimeLine(data) {
        try {
            let courses = await Course.findAll({
                include: [
                    {
                        model: Comment,
                        as: 'comments'
                    },
                    {
                        model: StartingQuiz,
                        as: 'starting_quiz'
                    },
                    {
                        required: true,
                        attributes: [],
                        model: TimeLine,
                        as: 'time_lines'
                    }
                ]
            });
            if (data?.manager_id) {
                courses = courses.filter(course => course.manager_id === data.manager_id);
            }
            return {
                data: courses,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllWithTimeLineForUser(user_id) {
        try {
            let courses = await Course.findAll({
                include: [
                    {
                        model: Comment,
                        as: 'comments'
                    },
                    {
                        model: StartingQuiz,
                        as: 'starting_quiz'
                    },
                    {
                        required: true,
                        attributes: [],
                        model: TimeLine,
                        as: 'timelines'
                    },
                    {
                        required: false,
                        model: Code,
                        as: 'codes',
                        include: [
                            {
                                attributes: [],
                                required: true,
                                model: User,
                                as: 'user',
                                where: {
                                    id: user_id
                                }
                            }
                        ],
                        where: {
                            expiry_time: {
                                [Op.ne]: 0
                            }
                        }
                    }
                ]
            });
            return {
                data: courses,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async edit(data) {
        try {
            const course = await Course.findByPk(data.id);
            course.name = data.name || course.name;
            course.photo = data.photo || course.photo;
            course.description = data.description || course.description;
            await course.save();
            return {
                data: 'edit successfully',
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async delete(id) {
        try {
            const course = await Course.destroy({
                where: {
                    id: id
                }
            });
            if (course === 1) {
                return {
                    data: 'deleted successfully',
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

}

module.exports = { CourseService };