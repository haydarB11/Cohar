const { QuizStudentService } = require('../../services/QuizStudentService');


module.exports = {

    getAllMarksForOneStudentInOneCourse: async (req, res) => {
        const data = {
            course_id: req.body.course_id,
            user_id: req.params.user_id,
        };
        const result = await QuizStudentService.getAllForOneUserInOneCourse(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

}