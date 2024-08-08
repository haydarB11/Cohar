const {
	editComment,
	deleteComment,
	getAllCommentsForOneCourse,
} = require('../../controllers/ManagerControllers/CommentController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.delete('/:comment_id', deleteComment);

router.put('/:comment_id', editComment);

router.get('/:course_id', getAllCommentsForOneCourse);

module.exports = router;