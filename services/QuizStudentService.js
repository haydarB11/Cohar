const { QuizStudent, Quiz, StartingQuiz } = require('../models');
const httpStatus = require('../utils/httpStatus');

class QuizStudentService {

    constructor(data) {
        this.mark = data.mark;
        this.user_id = data.user_id;
        this.quiz_id = data.quiz_id;
        this.starting_quiz_id = data.starting_quiz_id;
    }

    async add() {
        try {
            const quizStudent = await QuizStudent.create(this);
            return {
                data: quizStudent,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllForOneUserInOneCourse(data) {
        try {
            const quizStudents = await QuizStudent.findAll({
                include: [
                    {
                        required: true,
                        model: Quiz,
                        as: 'quiz',
                        where: {
                            course_id: data.course_id
                        }
                    },
                ],
                where: {
                    user_id: data.user_id
                }
            });
            return {
                data: quizStudents,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllForOneUserInOneCourseForStartingQuiz(data) {
        try {
            const quizStudent = await QuizStudent.findOne({
                include: [
                    {
                        required: true,
                        model: StartingQuiz,
                        as: 'starting_quiz',
                        where: {
                            course_id: data.course_id
                        }
                    },
                ],
                where: {
                    user_id: data.user_id
                }
            });
            return {
                data: quizStudent,
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

module.exports = { QuizStudentService };