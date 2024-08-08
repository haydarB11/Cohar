const { QuizService } = require('../../services/QuizService');


module.exports = {

    addQuiz: async (req, res) => {
        const result = await new QuizService(req.body).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteQuiz: async (req, res) => {
        const result = await QuizService.delete(req.params.quiz_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getOneQuizWithAllItsRelatives: async (req, res) => {
        const result = await QuizService.getById(req.params.quiz_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllQuizForOneCourse: async (req, res) => {
        const result = await QuizService.getAllForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editQuiz: async (req, res) => {
        const data = req.body;
        data.id = req.params.quiz_id;
        const result = await QuizService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

}