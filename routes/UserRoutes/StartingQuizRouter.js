const {
	getAllQuizForOneCourse,
} = require('../../controllers/UserControllers/StartingQuizController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.get('/get-all/:course_id', getAllQuizForOneCourse);

module.exports = router;