const { CourseService } = require('../../services/CourseService');

module.exports = {

    getAllCourses: async (req, res) => {
        const result = await CourseService.getAllWithTimeLineForUser(req.user.id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}