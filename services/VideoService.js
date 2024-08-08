const { Video } = require('../models');
const httpStatus = require('../utils/httpStatus');

class VideoService {

    constructor(data) {
        this.url = data.url;
        this.level_id = data.level_id;
        this.quality = data.quality;
        this.title = data.title;
    }

    static async addAll(data, t) {
        try {
            const videos = await Video.bulkCreate(data, { transaction: t });
            return {
                data: videos,
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

    async add() {
        try {
            const video = await Video.create(this);
            return {
                data: video,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async get(id) {
        try {
            const video = await Video.findByPk(id);
            return {
                data: video.url,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getForOneLevel(level_id) {
        try {
            const videos = await Video.findAll({
                where: {
                    level_id: level_id
                }
            });
            return {
                data: videos,
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
            const video = await Video.findByPk(id);
            const deletedVideo = await Video.destroy({
                where: {
                    id: id
                }
            });
            if (deletedVideo === 1) {
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

}

module.exports = { VideoService };