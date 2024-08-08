const { Code, User } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class CodeService {

    constructor(data) {
        this.course_id = data.course_id;
        this.user_id = data.user_id;
        this.is_active = data.is_active;
        this.expiry_time = data.expiry_time;
    }

    static async addAll(data) {
        try {
            const code = await Code.bulkCreate(data, { returning: false });
            return {
                data: code,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getByCode(codeVar) {
        try {
            const code = await Code.findOne({
                where: {
                    code: codeVar
                }
            });
            return {
                data: code,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getForUserInCourse(user_id, course_id) {
        try {
            const code = await Code.findOne({
                where: {
                    user_id: user_id,
                    course_id: course_id
                }
            });
            return {
                data: code,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getById(id) {
        try {
            const code = await Code.findOne({
                where: {
                    id: id
                }
            });
            return {
                data: code,
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
            const code = await Code.findByPk(data.id);
            if (data.is_active != null) {
                code.is_active = data.is_active;
            }
            code.user_id = data.user_id || code.user_id;
            code.save();
            return {
                data: `code is ${data.is_active == 1 ? "activated" : "stopped" } now `,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllForOneCourse(course_id) {
        try {
            const codes = await Code.findAll({
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ],
                where: {
                    course_id: course_id,
                    user_id: {
                        [Op.eq]: null
                    },
                    is_active: true
                },
            });
            return {
                data: codes,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllActiveWithoutUser() {
        try {
            const codes = await Code.findAll({
                where: {
                    user_id: {
                        [Op.ne]: null,
                    },
                    expiry_time: {
                        [Op.ne]: 0,
                    },
                    is_active: true,
                },
            });
            return {
                data: codes,
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

module.exports = { CodeService };