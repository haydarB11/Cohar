const { 
    Quiz, 
    Question,
    Answer,
    ExerciseQuestion,
    ExerciseAnswer,
} = require('../models');
const httpStatus = require('../utils/httpStatus');

class QuizService {

    constructor(data) {
        this.name = data.name;
        this.success_mark = data.success_mark;
        this.full_mark = data.full_mark;
        this.course_id = data.course_id;
    }

    async add() {
        try {
            const quiz = await Quiz.create(this);
            return {
                data: quiz,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async checkSuccess(data) {
        try {
            const quiz = await Quiz.findOne({
                where: {
                    id: data.quiz_id,
                }
            });
            return {
                data: (data.mark >= quiz.success_mark) ? 1 : 0,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getById(quiz_id) {
        try {
            const quiz = await Quiz.findOne({
                include: [
                    {
                        model: Question,
                        as: 'questions',
                        include: [
                            {
                                model: Answer,
                                as: 'answers'
                            },
                        ]
                    }
                ],
                where: {
                    id: quiz_id
                }
            });
            return {
                data: quiz,
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
            const quiz = await Quiz.findAll({
                where: {
                    course_id: course_id
                }
            });
            return {
                data: quiz,
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
            const quiz = await Quiz.findByPk(data.id);
            quiz.name = data.name || quiz.name;
            quiz.success_mark = data.success_mark || quiz.success_mark;
            quiz.full_mark = data.full_mark || quiz.full_mark;
            quiz.course_id = data.course_id || quiz.course_id;
            await quiz.save();
            return {
                data: quiz,
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
            const deletedQuiz = await Quiz.destroy({
                where: {
                    id: id
                }
            });
            if (deletedQuiz === 1) {
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

module.exports = { QuizService };