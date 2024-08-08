const { 
    Advertisement,
    User,
} = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class AdvertisementService {

    constructor(data) {
        this.title = data.title;
        this.image = data.image;
        this.content = data.content;
        this.manager_id = data.manager_id;
    }

    async add() {
        try {
            const advertisement = await Advertisement.create(this);
            return {
                data: advertisement,
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
            const advertisement = await Advertisement.findByPk(data.id);
            advertisement.title = data.title || advertisement.title;
            advertisement.content = data.content || advertisement.content;
            advertisement.image = data.image || advertisement.image;
            await advertisement.save();
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

    static async delete(ids) {
        try {
            const deletedAdvertisement = await Advertisement.destroy({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            if (deletedAdvertisement > 0) {
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

    static async getAll() {
        try {
            const advertisements = await Advertisement.findAll({
                include: [
                    {
                        model: User,
                        as: 'manager'
                    }
                ]
            });
            return {
                data: advertisements,
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

module.exports = { AdvertisementService };