const { TimeLineService } = require('../../services/TimeLineService');
const httpStatus = require('../../utils/httpStatus');
const {FactoryHelper} = require('../../utils/helper/FactoryHelper');
const {sequelize} = require('../../models');
const { UserService } = require('../../services/UserService');
const { StudentPinService } = require('../../services/StudentPinService');

module.exports = {
    
    addTimeLineForOneCourseWithDeletingOldOnes: async (req, res) => {
        const t = await sequelize.transaction();
        try {
            const factoredTimeLine = FactoryHelper.determineTimeLineOrder(req.params.course_id, req.body.data);
                const oldTimeline = await TimeLineService.get(req.params.course_id);
                if (oldTimeline.data.length > 0) {
                    res.status(httpStatus.BAD_REQUEST).send({
                        data: "you cannot add time line twice, but you can edit it",
                    });
                    return;
                } else {
                    const timeLine = await TimeLineService.addAll(factoredTimeLine);
                    if (timeLine.status === httpStatus.OK) {
                        const usersWithNoPins = await UserService.getAllWithNoPins(req.params.course_id);
                        let data = {};
                        for (let i = 0; i < usersWithNoPins.data.length; i++) {
                            data.user_id = usersWithNoPins.data[i].id;
                            const timeline = await TimeLineService.getFirstQuiz(req.params.course_id);
                            if (timeline.data?.id) {
                                data.timeline_id = timeline.data.id;
                            } else {
                                const lastNode = await TimeLineService.getLastNodeOnTimeline(req.params.course_id);
                                data.timeline_id = lastNode.data?.id; // why is ? exists
                                data.is_completed = true;
                            }
                            const pin = await new StudentPinService(data).add();
                            data = {};
                        }
                        res.status(httpStatus.OK).send({
                            data: timeLine.data,
                        });
                    } else {
                        res.status(httpStatus.BAD_REQUEST).send({
                            data: "bad request or something wrong happen1",
                        });
                    }
                }
            await t.commit();
        } catch (error) {
            t.rollback();
            res.status(httpStatus.BAD_REQUEST).send({
                data: error.message,
            });
        }
    },
    
    editTimeline: async (req, res, next) => {
        const t = await sequelize.transaction();
        try {
            const data = {};
            const {
                factoredTimeLines,
                quiz_ids,
                level_ids,
            } = FactoryHelper.determineTimeLineOrderWithListForEachId(req.params.course_id, req.body.data, req.user.id);
            
            const newTimeline = [];
            for (let i = 0; i < factoredTimeLines.length; i++) {
                const timeline = await TimeLineService.edit(factoredTimeLines[i]);
                newTimeline.push(timeline.data);
                if (timeline.status === httpStatus.BAD_REQUEST) {
                    return res.status(httpStatus.BAD_REQUEST).send({
                        data: 'something went wrong',
                    });
                }
            }

            const usersWithPins = await UserService.getAllWithPinsForOneCourse(req.params.course_id);
            if (usersWithPins.status == httpStatus.BAD_REQUEST) {
                return res.status(httpStatus.BAD_REQUEST).send({
                    data: 'something went wrong',
                });
            }
            for(let i = 0; i < usersWithPins.data.length; i++) {
                let have_in_common = false;
                data.user_id = usersWithPins.data[i].id;
                for(let j = 0; j < usersWithPins.data[i].student_pins.length; j++) {
                    if (
                        level_ids.includes(usersWithPins.data[i].student_pins[j].timeline.level_id) ||
                        quiz_ids.includes(usersWithPins.data[i].student_pins[j].timeline.quiz_id) ) {
                        have_in_common = true;
                        if (usersWithPins.data[i].student_pins[j].is_completed === true) {
                            const lastPinOnNewTimeline = newTimeline.find((currentValue, index, arr) => {
                                return  currentValue.level_id == usersWithPins.data[i].student_pins[j].timeline.level_id && 
                                        currentValue.quiz_id == usersWithPins.data[i].student_pins[j].timeline.quiz_id
                            });
                            const futurePin = newTimeline.find((currentValue, index, arr) => {
                                return currentValue.level_id == null && currentValue.order > lastPinOnNewTimeline.order
                            });
                            if (futurePin) {
                                data.timeline_id = futurePin.id;
                                await new StudentPinService(data).add();
                                data = {};
                            } else {
                                data.timeline_id = newTimeline[newTimeline.length - 1].id;
                                if (data.timeline_id != usersWithPins.data[i].student_pins[j].timeline_id) {
                                    await new StudentPinService(data).add();
                                }
                            }
                        }
                        break;
                    }
                }
                if (!have_in_common) {
                    const firstQuizOnNewTimeline = newTimeline.find((currentValue, index, arr) => {
                        return currentValue.level_id == null
                    });
                    if (firstQuizOnNewTimeline) {
                        data.timeline_id = firstQuizOnNewTimeline.id;
                        newPin = await new StudentPinService(data).add();
                    } else {
                        const finalLevelOnNewTimeline = newTimeline[newTimeline.length - 1];
                        data.timeline_id = finalLevelOnNewTimeline.id;
                        newPin = await new StudentPinService(data).add();
                    }
                }
            }
            const deletedTimeLine = await TimeLineService.deleteManyFromOldTimeline(req.params.course_id, level_ids, quiz_ids);
            let timeline;
            if (deletedTimeLine.status === httpStatus.OK) {
                for (let i = 0; i < factoredTimeLines.length; i++) {
                    timeline = await TimeLineService.edit(factoredTimeLines[i], t);
                    if (timeline.status === httpStatus.BAD_REQUEST) {
                        return res.status(httpStatus.BAD_REQUEST).send({
                            data: 'something went wrong',
                        });
                    }
                }
            } else {
                return res.status(httpStatus.BAD_REQUEST).send({
                    data: 'something went wrong',
                });
            }
            res.status(httpStatus.OK).send({
                data: "edited",
            });
        } catch (error) {
            await t.rollback()
            res.status(httpStatus.BAD_REQUEST).send({
                data: error.message,
            });
        }
    },

    getTimeLineForOneCourse: async (req, res) => {
        const timeLine = await TimeLineService.get(req.params.course_id);
        console.log(timeLine.data);
        res.status(timeLine.status).send({
            data: timeLine.data,
        });
    },

    editTimelineAvailable: async (req, res) => {
        const data = req.body;
        const timeLine = await TimeLineService.editAvailable(data);
        res.status(timeLine.status).send({
            data: (timeLine.status == 200) ? 'edit successfully' : 'failed to edit',
        });
    }

}