const { Question } = require('../models');
const httpStatus = require('../utils/httpStatus');
const sequelize = require('sequelize');

class QuestionService {

    constructor(data) {
        this.url = data.url;
        this.type = data.type;
        this.url_type = data.url_type;
        this.url_type = 'text';
        this.mark = data.mark;
        this.quiz_id = data.quiz_id;
        this.starting_quiz_id = data.starting_quiz_id;
        this.model = data.model;
        this.error_note = data.error_note;
    }

    async add() {
        try {
            if (this.url.endsWith('.pdf')) {
                this.url_type = "pdf";
            } else if (this.url.endsWith('jpeg') || 
                        this.url.endsWith('jpg') || 
                        this.url.endsWith('png')) {
                this.url_type = "image";
            } else {
                this.url_type = "text"
            }
            const question = await Question.create(this);
            return {
                data: question,
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
            const question = await Question.destroy({
                where: {
                    id: id
                }
            });
            if (question === 1) {
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

    static async getAllForOneQuiz(quiz_id) {
        try {
            const questions = await Question.findAll({
                where: {
                    quiz_id: quiz_id
                }
            });
            return {
                data: questions,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getNumberOfModelsForOneQuiz(quiz_id) {
        try {
            const models = await Question.findAll({
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('model')), 'model']
                ],
                where: {
                    quiz_id: quiz_id
                },
                order: [['model', 'ASC']]
            });
            return {
                data: models,
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
            const question = await Question.findByPk(data.id);
            question.type = data.type || question.type;
            question.mark = data.mark || question.mark;
            question.quiz_id = data.quiz_id || question.quiz_id;
            question.starting_quiz_id = data.starting_quiz_id || question.starting_quiz_id;
            question.model = data.model || question.model;
            question.url_type = data.url_type || question.url_type;
            question.url = data.url || question.url;
            question.error_note = data.error_note || question.error_note;
            if (data.url) {
                question.url = data.url;
                if (data.url.endsWith('.pdf')) {
                    question.url_type = "pdf";
                } else if (data.url.endsWith('jpeg') || data.url.endsWith('jpg') || data.url.endsWith('png')) {
                    question.url_type = "image";
                } else {
                    question.url_type = "text";
                }
            }
            await question.save();
            return {
                data: question,
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

module.exports = { QuestionService };