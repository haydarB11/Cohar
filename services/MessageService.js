const { Message, User } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class MessageService {

    constructor(data) {
        this.message = data.message;
        this.sender_id = data.sender_id;
        this.receiver_id = data.receiver_id;
    }

    async add() {
        try {
            const message = await Message.create(this);
            return {
                data: message,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getInbox(receiver_id) {
        try {
            const messages = await Message.findAll({
                include: [
                    {
                        model: User,
                        as: 'sender'
                    }
                ],
                where: {
                    receiver_id: receiver_id
                }
            });
            return {
                data: messages,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getOutbox(sender_id) {
        try {
            const messages = await Message.findAll({
                include: [
                    {
                        model: User,
                        as: 'receiver'
                    }
                ],
                where: {
                    sender_id: sender_id
                }
            });
            return {
                data: messages,
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
            const messageVar = await Message.findByPk(data.message_id);
            messageVar.message = data.message;
            messageVar.save();
            return {
                data: messageVar,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async delete(message_id) {
        try {
            const deletedMessage = await Message.destroy({
                where: {
                    id: message_id
                }
            });
            if (deletedMessage === 1) {
                return {
                    data: 'deleted successfully',
                    status: httpStatus.OK
                };
            } else {
                return {
                    data: 'something went wrong, try to delete it later',
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

    static async getAllBetweenSpecificUsers(data) {
        try {
            const messages = await Message.findAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                {
                                    receiver_id: data.user_id,
                                },
                                {
                                    receiver_id: data.manager_id,
                                }
                            ],
                        },
                        {
                            [Op.or]: [
                                {
                                    sender_id: data.user_id,
                                },
                                {
                                    sender_id: data.manager_id,
                                }
                            ]
                        }
                    ]
                },
                order: [['created_at', 'ASC']]
            });
            return {
                data: messages,
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

module.exports = { MessageService };