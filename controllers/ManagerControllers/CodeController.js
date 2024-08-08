const { CodeService } = require('../../services/CodeService');
const { StudentPinService } = require('../../services/StudentPinService');
const statusCode = require('../../utils/httpStatus');

module.exports = {

    addManyCodes: async (req, res) => {
        const allData = Array(+ req.body.number_of_codes).fill(req.body);
        const result = await CodeService.addAll(allData);
        res.status(result.status).send({
            data: result.data,
        });
    },

    editCode: async (req, res) => {
        const data = req.body;
        data.id = req.params.code_id;
        const result = await CodeService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllCodesForOneCourse: async (req, res) => {
        const result = await CodeService.getAllForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteExpiredCodes: async () => {
        try {
            const codes = await CodeService.getAllActiveWithoutUser();
            codes.forEach(async (element) => {
                element.expiry_time -= 1;
                if (element.expiry_time === 0) {
                    element.is_active = false;
                }
                await element.save();
            });
        } catch (error) {
            console.log(error.message);
        }
    },

}