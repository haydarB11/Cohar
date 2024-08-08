const { PreviousExam } = require('../models');
const httpStatus = require('../utils/httpStatus');
const fs = require('fs');

class PreviousExamService {

    constructor(data) {
        this.url = data.url;
        this.date = data.date;
        this.course_id = data.course_id;
    }

    async add() {
        try {
            const previousExam = await PreviousExam.create(this);
            return {
                data: previousExam,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllForOneCourse(course_id) {
        try {
            const previousExams = await PreviousExam.findAll({
                where: {
                    course_id: course_id
                }
            });
            return {
                data: previousExams,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async delete(id) {
        try {
            const previousExam = await PreviousExam.findByPk(id);
            const deletedPreviousExam = await PreviousExam.destroy({
                where: {
                    id: id
                }
            });
            if (deletedPreviousExam === 1) {
                fs.unlinkSync(previousExam.url);
                return {
                    data: 'deleted',
                    status: httpStatus.OK
                };
            } else {
                return {
                    data: 'something went wrong',
                    status: httpStatus.BAD_REQUEST
                };
            }
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

}

module.exports = { PreviousExamService };