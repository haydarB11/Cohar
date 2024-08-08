const { Level, Pdf, Video, Course } = require('../models');
const httpStatus = require('../utils/httpStatus');

class LevelService {

    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.course_id = data.course_id;
    }

    async add(t) {
        try {
            const level = await Level.create(this, { transaction: t });
            return {
                data: level,
                status: httpStatus.OK
            };
        } catch (error) {
            await t.rollback();
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllForOneCourse(course_id) {
        try {
            const levels = await Level.findAll({
                include: [
                    {
                        model: Pdf,
                        as: 'pdfs'
                    },
                    {
                        model: Video,
                        as: 'videos'
                    },
                ],
                where: {
                    course_id: course_id
                }
            });
            return {
                data: levels,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAll() {
        try {
            const levels = await Level.findAll({});
            return {
                data: levels,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getById(level_id) {
        try {
            const level = await Level.findOne({
                include: [
                    {
                        model: Pdf,
                        as: 'pdfs'
                    },
                    {
                        model: Video,
                        as: 'videos'
                    },
                    {
                        model: Course,
                        as: 'course'
                    }
                ],
                where: {
                    id: level_id
                }
            });
            return {
                data: level,
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
            const deletedLevel = await Level.destroy({
                where: {
                    id: id
                }
            });
            if (deletedLevel === 1) {
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
    
    static async edit(data) {
        try {
            const level = await Level.findByPk(data.level_id);
            level.name = data.name || level.name;
            level.description = data.description || level.description;
            level.course_id = data.course_id || level.course_id;
            if (data.video) {
                level.video = data.video;
            }
            level.save();
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

}

module.exports = { LevelService };