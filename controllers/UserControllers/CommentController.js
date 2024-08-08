const { CommentService } = require('../../services/CommentService');

module.exports = {
    
    addComment: async (req, res) => {
        const data = req.body;
        data.user_id = req.user.id;
        const result = await new CommentService(data).add();
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
    
    deleteComment: async (req, res) => {
        const result = await CommentService.delete(req.params.comment_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

}