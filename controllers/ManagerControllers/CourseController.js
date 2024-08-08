const { CourseService } = require('../../services/CourseService');

module.exports = {

    addCourse: async (req, res) => {
        const data = req.body;
        data.manager_id = req.user.id;
        data.photo = req.file?.path;
        const result = await new CourseService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    editCourse: async (req, res) => {
        const data = req.body;
        data.id = req.params.course_id;
        data.photo = req.file?.path;
        const result = await CourseService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteCourse: async (req, res) => {
        const result = await CourseService.delete(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllCourses: async (req, res) => {
        const data = {manager_id: req.user.id};
        const result = await CourseService.getAll(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllCourseWithItsLevelsForSpecificYearForOneManager: async (req, res) => {
        const data = req.params;
        data.manager_id = req.user.id;
        const result = await CourseService.getAll(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllOuterCourse: async (req, res) => {
        const result = await CourseService.getAllOuter();
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllCourseForOneCategory: async (req, res) => {
        const data = req.params;
        const result = await CourseService.getAllForOneCategory(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

}