const { ExerciseAnswer } = require('../models');
const httpStatus = require('../utils/httpStatus');

class ExerciseAnswerService {

    constructor(data) {
        this.name = data.name;
        this.is_correct = data.is_correct;
        this.exercise_question_id = data.exercise_question_id;
    }

    async add() {
        try {
            const exerciseAnswer = await ExerciseAnswer.create(this);
            return {
                data: exerciseAnswer,
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
            const exerciseAnswer = await ExerciseAnswer.findByPk(data.id);
            exerciseAnswer.exercise_question_id = data.exercise_question_id || exerciseAnswer.exercise_question_id;
            exerciseAnswer.is_correct = data.is_correct || exerciseAnswer.is_correct;
            exerciseAnswer.name = data.name || exerciseAnswer.name;
            await exerciseAnswer.save();
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
            const exerciseAnswer = await ExerciseAnswer.destroy({
                where: {
                    id: id
                }
            });
            if (exerciseAnswer === 1) {
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
    
    static async getAllForOneExercise(exercise_question_id) {
        try {
            const exerciseAnswers = await ExerciseAnswer.findAll({
                where: {
                    exercise_question_id: exercise_question_id
                }
            });
            return {
                data: exerciseAnswers,
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

module.exports = { ExerciseAnswerService };