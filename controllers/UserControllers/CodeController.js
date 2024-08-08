const { CodeService } = require('../../services/CodeService');
const { StudentPinService } = require('../../services/StudentPinService');
const { TimeLineService } = require('../../services/TimeLineService');
const httpStatus = require('../../utils/httpStatus');

module.exports = {

    relateCodeWithStudent: async (req, res) => {
        const data = {};
        data.user_id = req.user.id;
        try {
            const code = await CodeService.getByCode(req.body.code);
            if (!code.data) {
                res.status(httpStatus.BAD_REQUEST).send({
                    data: 'you are entered invalid code',
                });
                return;
            } else if (code.data.user_id || code.data.is_active == false) {
                res.status(httpStatus.BAD_REQUEST).send({
                    data: 'this code is used before',
                });
                return;
            } 
            const codeSameCorse = await CodeService.getForUserInCourse(data.user_id, req.body.code);
            if (codeSameCorse.data?.id) {
                res.status(httpStatus.BAD_REQUEST).send({
                    data: 'you buy this course before',
                });
                return;
            }
            data.id = code.data.id;
            // data.is_active = true;
            const editCode = await CodeService.edit(data);
            const timeline = await TimeLineService.getFirstQuiz(code.data.course_id);
            if (timeline.data?.id) {
                data.timeline_id = timeline.data.id;
            } else {
                const lastNode = await TimeLineService.getLastNodeOnTimeline(code.data.course_id);
                data.timeline_id = lastNode.data?.id;
                data.is_completed = true;
            }
            if (data?.timeline_id){
                const studentPin = await new StudentPinService(data).add();
            }
            res.status(httpStatus.OK).send({
                data: 'related successfully',
            });
        } catch (err) {
            res.status(httpStatus.BAD_REQUEST).send({
                data: err.message,
            });
        }
    },

}