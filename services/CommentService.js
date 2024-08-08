const { Comment, User } = require('../models');
const httpStatus = require('../utils/httpStatus');

class CommentService {

    constructor(data) {
        this.title = data.title;
        this.is_show = data.is_show;
        this.course_id = data.course_id;
        this.user_id = data.user_id;
    }

    async add() {
        try {
            const comment = await Comment.create(this);
            return {
                data: comment,
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
            const comments = await Comment.findAll({
                include: [
                    {
                        model: User,
                        as: 'user'
                    }
                ],
                where: {
                    course_id: course_id
                }
            });
            return {
                data: comments,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async getAllShowForOneCourse(course_id) {
        try {
            const comments = await Comment.findAll({
                where: {
                    course_id: course_id,
                    is_show: true,
                }
            });
            return {
                data: comments,
                status: httpStatus.OK
            };
        } catch (error) {
            return {
                data: error.message,
                status: httpStatus.BAD_REQUEST
            };
        }
    }

    static async edit(data) {
        try {
            const comment = await Comment.findByPk(data.id);
            comment.is_show = data.is_show;
            await comment.save();
            return {
                data: 'updated',
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
            const deletedComment = await Comment.destroy({
                where: {
                    id: id
                }
            });
            if (deletedComment >= 1) {
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

module.exports = { CommentService };