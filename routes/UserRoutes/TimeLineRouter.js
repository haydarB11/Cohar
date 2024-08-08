const {
	getTimeLineForOneCourseWithPin,
} = require('../../controllers/UserControllers/TimeLineController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.get('/get/:course_id', getTimeLineForOneCourseWithPin);

module.exports = router;