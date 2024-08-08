const { AnswerService } = require('../../services/AnswerService');
const { QuestionService } = require('../../services/QuestionService');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


module.exports = {

    addQuestionWithItsAnswers: async (req, res) => {
        const data = req.body;
        if (req.file) {
            data.url = req.file.path;
        } else {
            data.url = data.file;
        }
        const result = await new QuestionService(data).add();
        const question_id_var = result.data.id;
        const factoredAnswers = data.answers.map( answer => ({
            question_id: question_id_var,
            name: answer,
            is_correct: false
        }));
        factoredAnswers[0].is_correct = true;
        shuffleArray(factoredAnswers);
        const answers = await AnswerService.addMany(factoredAnswers);
        res.status(answers.status).send({ 
            data: answers.data,
        });
    },

    deleteQuestion: async (req, res) => {
        const result = await QuestionService.delete(req.params.question_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllQuestionsForOneQuiz: async (req, res) => {
        const result = await QuestionService.getAllForOneQuiz(req.params.quiz_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editQuestion: async (req, res) => {
        const data = req.body;
        data.id = req.params.question_id;
        if (req.file) {
            data.url = req.file.path;
        } else {
            data.url = data.file;
        }
        const result = await QuestionService.edit(data);
        res.status(result.status).send({
            data: result.data,
        }); 
    },

}