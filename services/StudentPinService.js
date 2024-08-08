const { TimeLine, StudentPin, Quiz, Course, Code } = require('../models');
const httpStatus = require('../utils/httpStatus');
const { Op } = require('sequelize');

class StudentPinService {

    constructor(data) {
        this.is_completed = data.is_completed;
        this.user_id = data.user_id;
        this.timeline_id = data.timeline_id;
        this.number_of_fails = data.number_of_fails;
    }

    async add() {
        try {
            const studentPin = await StudentPin.create(this);
            return {
                data: studentPin,
                status: httpStatus.OK
            };
        } catch (error) {
            // await t.rollback();
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async increaseNumberOfFails(data) {
        try {
            const studentPin = await StudentPin.findOne({
                include: [
                    {
                        required: true,
                        attributes: [],
                        model: TimeLine,
                        as: 'timeline',
                        where: {
                            quiz_id: data.quiz_id
                        }
                    }
                ],
                where: {
                    user_id: data.user_id,
                }
            });
            studentPin.number_of_fails += 1;
            await studentPin.save();
            return {
                data: studentPin,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async passQuiz(data) {
        try {
            const studentPin = await StudentPin.findOne({
                include: [
                    {
                        required: true,
                        attributes: [],
                        model: TimeLine,
                        as: 'timeline',
                        where: {
                            quiz_id: data.quiz_id
                        }
                    }
                ],
                where: {
                    user_id: data.user_id,
                }
            });
            studentPin.is_completed = 1;
            await studentPin.save();
            return {
                data: studentPin,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getLast(student_id, course_id) {
        try {
            let timelineId = await StudentPin.findOne({
                attributes: [
                    'timeline_id',
                ],
                include: [
                    {
                        required: true,
                        model: TimeLine,
                        as: 'timeline',
                        include: [
                            {
                                required: true,
                                model: Course,
                                as: 'course',
                                include: [
                                    {
                                        required: true,
                                        model: Code,
                                        as: 'codes',
                                        where: {
                                            course_id: course_id,
                                            user_id: student_id,
                                            is_active: true
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                where: {
                    timeline_id: {
                        [Op.ne]: null,
                    },
                },
                order: [['id', 'DESC']]
            });
            if (!timelineId) {
                timelineId = { timeline_id: "you are not registered in this course", is_registered: false };
            } else {
                timelineId = { timeline_id: timelineId, is_registered: true };
            }
            return {
                data: timelineId,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getCurrentDependingOnQuizId(student_id, quiz_id) {
        try {
            let studentPin = await StudentPin.findOne({
                attributes: [
                    'timeline_id',
                    'number_of_fails',
                    'is_completed'
                ],
                include: [
                    {
                        required: true,
                        model: TimeLine,
                        as: 'timeline',
                        where: {
                            quiz_id: quiz_id,
                        }
                    }
                ],
                where: {
                    user_id: student_id
                }
            });
            return {
                data: studentPin,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

}

module.exports = { StudentPinService };