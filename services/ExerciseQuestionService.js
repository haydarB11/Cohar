const { ExerciseQuestion } = require('../models');
const httpStatus = require('../utils/httpStatus');

class ExerciseQuestionService {

    constructor(data) {
        this.url = data.url;
        this.url_type = data.url_type;
        this.mark = data.mark;
        this.question_id = data.question_id;
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
            const exerciseQuestion = await ExerciseQuestion.create(this);
            return {
                data: exerciseQuestion,
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
            const exerciseQuestion = await ExerciseQuestion.destroy({
                where: {
                    id: id
                }
            });
            if (exerciseQuestion === 1) {
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

    static async getAll(question_id) {
        try {
            const exerciseQuestions = await ExerciseQuestion.findAll({
                where: {
                    question_id: question_id
                }
            });
            return {
                data: exerciseQuestions,
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
            const exerciseQuestion = await ExerciseQuestion.findByPk(data.id);
            exerciseQuestion.mark = data.mark || exerciseQuestion.mark;
            exerciseQuestion.question_id = data.question_id || exerciseQuestion.question_id;
            if (data.url) {
                exerciseQuestion.url = data.url;
                exerciseQuestion.url_type = data.url_type;
                if (data.url.endsWith('.pdf')) {
                    data.url_type = "pdf";
                } else if (data.url.endsWith('jpeg') || data.url.endsWith('jpg') || data.url.endsWith('png')) {
                    data.url_type = "image";
                } else {
                    data.url_type = "text"
                }
            }
            exerciseQuestion.save();
            return {
                data: exerciseQuestion,
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

module.exports = { ExerciseQuestionService };