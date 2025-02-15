const { StartingQuizService } = require('../../services/StartingQuizService');


module.exports = {

    addQuiz: async (req, res) => {
        const result = await new StartingQuizService(req.body).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteQuiz: async (req, res) => {
        const result = await StartingQuizService.delete(req.params.quiz_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getOneQuizWithAllItsRelatives: async (req, res) => {
        const result = await StartingQuizService.getById(req.params.quiz_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllQuizForOneCourse: async (req, res) => {
        const result = await StartingQuizService.getForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editQuiz: async (req, res) => {
        const data = req.body;
        data.id = req.params.quiz_id;
        const result = await StartingQuizService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

}