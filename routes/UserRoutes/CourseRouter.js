const { getAllShowCommentsForOneCourse } = require('../../controllers/UserControllers/CommentController');
const {
	getAllCourses,
} = require('../../controllers/UserControllers/CourseController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.get('/get-all', getAllCourses);

router.get('/comment/:course_id', getAllShowCommentsForOneCourse);

module.exports = router;