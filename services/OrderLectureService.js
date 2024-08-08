const { OrderLecture, User, Pdf, Level, Course } = require('../models');
const httpStatus = require('../utils/httpStatus');

class OrderLectureService {

    constructor(data) {
        this.user_id = data.user_id;
        this.pdf_id = data.pdf_id;
        this.is_ordered = data.is_ordered;
    }

    async add(t) {
        try {
            const checkOrderExists = await OrderLecture.findOne({
                where: {
                    user_id : this.user_id,
                    pdf_id : this.pdf_id,
                }
            }, { transaction: t});
            if (checkOrderExists) {
                return {
                    data: 'you can not order the lecture more than once',
                    status: httpStatus.OK
                };
            } else {
                const order = await OrderLecture.create(this, { transaction: t });
                return {
                    data: order,
                    status: httpStatus.OK
                };
            }
        } catch (error) {
            await t.rollback();
            return { 
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async editStatus(data) {
        try {
            const order = await OrderLecture.findByPk(data.order_id);
            order.is_ordered = data.is_ordered;
            await order.save();
            return {
                data: order,
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
            const orders = await OrderLecture.findAll({
                include: [
                    {
                        model: User,
                        as: 'user'
                    },
                    {
                        model: Pdf,
                        as: 'pdf'
                    }
                ],
                order: [['id', 'DESC']]
            });
            return {
                data: orders,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllForOneManager(manager_id) {
        try {
            const orders = await OrderLecture.findAll({
                include: [
                    {
                        model: User,
                        as: 'user'
                    },
                    {
                        required: true,
                        model: Pdf,
                        as: 'pdf',
                        include: [
                            {
                                required: true,
                                model: Level,
                                as: 'level',
                                include: [
                                    {
                                        required: true,
                                        model: Course,
                                        as: 'course',
                                        where: {
                                            manager_id: manager_id
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            return {
                data: orders,
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

module.exports = { OrderLectureService };