const { ExerciseAnswerService } = require('../../services/ExerciseAnswerService');

module.exports = {

    addExerciseAnswer: async (req, res) => {
        const result = await new ExerciseAnswerService(req.body).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    editExerciseAnswer: async (req, res) => {
        const data = req.body;
        data.id = req.params.exercise_answer_id;
        const result = await ExerciseAnswerService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteExerciseAnswer: async (req, res) => {
        const result = await ExerciseAnswerService.delete(req.params.exercise_answer_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllExerciseAnswersForOneExercise: async (req, res) => {
        const result = await ExerciseAnswerService.getAllForOneExercise(req.params.exercise_question_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}