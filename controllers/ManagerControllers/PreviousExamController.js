const { PreviousExamService } = require('../../services/PreviousExamService');


module.exports = {

    addPreviousExam: async (req, res) => {
        const data = req.body;
        data.url = req.file.path;
        const result = await new PreviousExamService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    deletePreviousExam: async (req, res) => {
        const result = await PreviousExamService.delete(req.params.previous_exam_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllPreviousExamForOneCourse: async (req, res) => {
        const result = await PreviousExamService.getAllForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}