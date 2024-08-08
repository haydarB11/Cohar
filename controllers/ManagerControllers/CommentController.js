const { CommentService } = require('../../services/CommentService');

module.exports = {
    
    editComment: async (req, res) => {
        const data = req.body;
        data.id = req.params.comment_id;
        const result = await CommentService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    getAllShowCommentsForOneCourse: async (req, res) => {
        const result = await CommentService.getAllShowForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    getAllCommentsForOneCourse: async (req, res) => {
        const result = await CommentService.getAllForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    deleteComment: async (req, res) => {
        const result = await CommentService.delete(req.params.comment_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}