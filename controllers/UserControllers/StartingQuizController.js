const { StartingQuizService } = require('../../services/StartingQuizService');

module.exports = {

    getAllQuizForOneCourse: async (req, res) => {
        const result = await StartingQuizService.getForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}