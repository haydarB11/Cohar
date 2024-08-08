const { Answer } = require('../models');
const httpStatus = require('../utils/httpStatus');

class AnswerService {

    constructor(data) {
        this.name = data.name;
        this.is_correct = data.is_correct;
        this.question_id = data.question_id;
    }

    async add() {
        try {
            const answer = await Answer.create(this);
            return {
                data: answer,
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
            const answers = await Answer.bulkCreate(data);
            return {
                data: answers,
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
            const answer = await Answer.findByPk(data.id);
            answer.question_id = data.question_id || answer.question_id;
            answer.is_correct = data.is_correct || answer.is_correct;
            answer.name = data.name || answer.name;
            await answer.save();
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
            const answer = await Answer.destroy({
                where: {
                    id: id
                }
            });
            if (answer === 1) {
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

    static async getAllForOneQuestion(question_id) {
        try {
            const answers = await Answer.findAll({
                where: {
                    question_id: question_id
                }
            });
            return {
                data: answers,
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

module.exports = { AnswerService };