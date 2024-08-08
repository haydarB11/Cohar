const { QuizService } = require('../../services/QuizService');
const { QuestionService } = require('../../services/QuestionService');
const { StudentPinService } = require('../../services/StudentPinService');


module.exports = {

    getOneQuizWithAllItsRelatives: async (req, res) => {
        const result = await QuizService.getById(req.params.quiz_id);
        let acceptedQuestions = [];
        let numberOfFailures = await StudentPinService.getCurrentDependingOnQuizId(req.user.id, req.params.quiz_id);
        const modelsOfOneQuiz = await QuestionService.getNumberOfModelsForOneQuiz(req.params.quiz_id);
        const indexOfModel = numberOfFailures.data?.number_of_fails % modelsOfOneQuiz.data.length || 0;
        for (let i = 0; i < result.data.questions.length; i++) {
            if (result.data.questions[i].model === modelsOfOneQuiz.data[indexOfModel].model) {
                acceptedQuestions.push(result.data.questions[i]);
            }
        }
        const name = result.data.name;
        const success_mark = result.data.success_mark;
        const full_mark = result.data.full_mark;
        const course_id = result.data.course_id;
        const finalResult = {
            name,
            success_mark,
            full_mark,
            course_id,
        };
        finalResult.questions = acceptedQuestions;
        res.status(result.status).send({
            data: finalResult,
        });
    },

}