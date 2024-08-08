const {
	addComment,
	deleteComment,
} = require('../../controllers/UserControllers/CommentController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.post('/', addComment);

router.delete('/:comment_id', deleteComment);

module.exports = router;