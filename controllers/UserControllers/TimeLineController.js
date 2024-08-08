const { TimeLineService } = require('../../services/TimeLineService');
const { StudentPinService } = require('../../services/StudentPinService');
const { TypeChecker } = require('../../utils/helper/TypeCheckerHelper');

module.exports = {

    getTimeLineForOneCourseWithPin: async (req, res) => { 
        const data = req.params;
        data.student_id = req.user.id;
        const timeLine = await TimeLineService.getForOneUser(data);
        const studentPin = await StudentPinService.getLast(req.user.id, req.params.course_id);
        if (TypeChecker.isInteger(studentPin.data?.timeline_id)) {
            const studentPinOrder = await TimeLineService.getById(studentPin.data.timeline_id);
            res.status(studentPin.status).send({
                data: {
                    timeline: timeLine.data,
                    is_registered: studentPinOrder.data.is_registered
                },
            });
        } else {
            res.status(studentPin.status).send({
                data: {
                    timeline: timeLine.data,
                    is_registered: studentPin.data.is_registered
                },
            });
        }
    }

}