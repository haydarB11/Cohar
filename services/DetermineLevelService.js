const {
    DetermineLevel,
    StartingQuiz,
} = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class DetermineLevelService {

    constructor(data) {
        this.timeline_id = data.timeline_id;
        this.starting_quiz_id = data.starting_quiz_id;
        this.percentage = data.percentage;
    }

    async add() {
        try {
            const determineLevel = await DetermineLevel.create(this);
            return {
                data: determineLevel,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async addMany(data) {
        try {
            const determineLevels = await DetermineLevel.bulkCreate(data);
            return {
                data: determineLevels,
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
            const determineLevel = await DetermineLevel.findByPk(data.id);
            determineLevel.timeline_id = data.timeline_id || determineLevel.timeline_id;
            determineLevel.starting_quiz_id = data.starting_quiz_id || determineLevel.starting_quiz_id;
            determineLevel.percentage = data.percentage || determineLevel.percentage;
            await determineLevel.save();
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
            const deletedDetermineLevels = await DetermineLevel.destroy({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            if (deletedDetermineLevels > 0) {
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
            const DetermineLevels = await DetermineLevel.findAll({});
            return {
                data: DetermineLevels,
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
            const DetermineLevels = await DetermineLevel.findAll({
                include: [
                    {
                        required: true,
                        model: StartingQuiz,
                        as: 'starting_quiz',
                        where: {
                            course_id: course_id
                        }
                    }
                ],
                order: [['percentage', 'ASC']]
            });
            return {
                data: DetermineLevels,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllForOneStartingQuiz(starting_quiz_id) {
        try {
            const DetermineLevels = await DetermineLevel.findAll({
                where: {
                    starting_quiz_id: starting_quiz_id
                },
                order: [['percentage', 'ASC']]
            });
            return {
                data: DetermineLevels,
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

module.exports = { DetermineLevelService };