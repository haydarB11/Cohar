const { AnswerService } = require('../../services/AnswerService');

module.exports = {

    addAnswer: async (req, res) => {
        const result = await new AnswerService(req.body).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    editAnswer: async (req, res) => {
        const data = req.body;
        data.id = req.params.answer_id;
        const result = await AnswerService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteAnswer: async (req, res) => {
        const result = await AnswerService.delete(req.params.answer_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllAnswersForOneQuestion: async (req, res) => {
        const result = await AnswerService.getAllForOneQuestion(req.params.question_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}