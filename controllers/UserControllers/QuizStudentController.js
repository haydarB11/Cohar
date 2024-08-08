const { QuizStudentService } = require('../../services/QuizStudentService');
const { QuizService } = require('../../services/QuizService');
const { TimeLineService } = require('../../services/TimeLineService');
const { StudentPinService } = require('../../services/StudentPinService');
const { DetermineLevelService } = require('../../services/DetermineLevelService');

const httpStatus = require('../../utils/httpStatus');
const { StartingQuizService } = require('../../services/StartingQuizService');


module.exports = {

    addQuizStudent: async (req, res) => {
        try {
            let result = {};
            const data = req.body;
            data.user_id = req.user.id;
            const currentStudentPin = await StudentPinService.getCurrentDependingOnQuizId(data.user_id, data.quiz_id);
            // if timeLineId is equal in both, then continue or return message
            const lastStudentPin = await StudentPinService.getLast(data.user_id, currentStudentPin.data.timeline.course_id);
            data.course_id = currentStudentPin.data.timeline.course_id;
            if (currentStudentPin.data.is_completed == 0) {
                const is_succeed = await QuizService.checkSuccess(data);
                if (is_succeed.data == 1) {
                    const quizStudent = await new QuizStudentService(data).add();
                    // edit student pin to be completed
                    const checkCurrentPinAsCompleted = await StudentPinService.passQuiz(data);
                    data.timeline_id = lastStudentPin.data.timeline_id.timeline_id;
                    const currentTimeline = await TimeLineService.getById(data.timeline_id);
                    data.order = currentTimeline.data.order;
                    const futureQuizOnTimeLine = await TimeLineService.getFutureQuiz(data);
                    if (futureQuizOnTimeLine.data != null && futureQuizOnTimeLine.status === httpStatus.OK) {
                        data.timeline_id = futureQuizOnTimeLine.data.id;
                        let newStudentPin = await new StudentPinService(data).add();
                        result.data = "success";
                        result.status = httpStatus.OK;
                    } else {
                        const lastNodeOnTimeLine = await TimeLineService.getLastNodeOnTimeline(data.course_id);
                        if (lastNodeOnTimeLine.data && lastNodeOnTimeLine.data.id === lastStudentPin.data.id) {
                            // you has already finished this course
                            result = {
                                status: httpStatus.OK,
                                data: "finished"
                            }
                        } else {
                            data.timeline_id = lastNodeOnTimeLine.data.id;
                            data.is_completed = true;
                            let newStudentPin = await new StudentPinService(data).add();
                            result.data = "success";
                            result.status = httpStatus.OK;
                        }
                    }
                } else {
                    const currentStudentPin = await StudentPinService.increaseNumberOfFails(data);
                    result.data = "failed";
                    result.status = httpStatus.OK;
                }
            } else {
                // you passed this exam before, your mark will still your old mark
                res.status(httpStatus.OK).send({
                    data: 'passed',
                });
                return;
            }   
            res.status(result.status).send({
                data: result.data,
            });
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send({
                data: error.message,
            });
        }
    },

    ///////////////////
    addStartingQuizStudent: async (req, res) => {
        try {
            const data = req.body;
            data.user_id = req.user.id;
            const determineLevels = await DetermineLevelService.getAllForOneStartingQuiz(data.starting_quiz_id);
            const quiz = await StartingQuizService.getById(data.starting_quiz_id);
            data.course_id = quiz.data.course_id;
            const quizStudentOld = await QuizStudentService.getAllForOneUserInOneCourseForStartingQuiz(data);
            if (quizStudentOld.data?.id) {
                return res.status(404).send({
                    data: 'you pass this quiz before',
                });
            }
            const quizStudent = await new QuizStudentService(data).add();
            const markPercentage = data.mark * 100 / quiz.data.full_mark;
            for ( let i = 0; i < determineLevels.data.length; i++) {
                if ( markPercentage >= determineLevels.data[i].percentage ) {
                    data.timeline_id = determineLevels.data[i].timeline_id;
                    data.is_completed = true;
                    let newStudentPin = await new StudentPinService(data).add();
                    break;
                } else {
                    if (data.mark < determineLevels.data[0].percentage) {
                        const timeline = await TimeLineService.getFirstQuiz(data.course_id);
                        if (timeline.data?.id) {
                            data.timeline_id = timeline.data.id;
                        } else {
                            const lastNode = await TimeLineService.getLastNodeOnTimeline(data.course_id);
                            data.timeline_id = lastNode.data?.id; // why is ? exists
                            data.is_completed = true;
                        }
                        const pin = await new StudentPinService(data).add();
                        break;
                    }
                }
            }
            res.status(200).send({
                data: 'added successfully',
            });
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send({
                data: error.message,
            });
        }
    },

}