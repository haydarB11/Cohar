const { ExerciseQuestionService } = require('../../services/ExerciseQuestionService');


module.exports = {

    addQuestion: async (req, res) => {
        const data = req.body;
        if (req.file) {
            data.url = req.file.path;
        } else {
            data.url = req.body.file;
        }
        const result = await new ExerciseQuestionService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteQuestion: async (req, res) => {
        const result = await ExerciseQuestionService.delete(req.params.exercise_question_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllExerciseQuestions: async (req, res) => {
        const result = await ExerciseQuestionService.getAll(req.params.question_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editQuestion: async (req, res) => {
        const data = req.body;
        data.id = req.params.exercise_question_id;
        if (req.file) {
            data.url = req.file.path;
        }
        const result = await ExerciseQuestionService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

}