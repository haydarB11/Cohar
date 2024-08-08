const {
	addTimeLineForOneCourseWithDeletingOldOnes, 
	getTimeLineForOneCourse,
	editTimeline,
	editTimelineAvailable,
} = require('../../controllers/ManagerControllers/TimeLineController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.post('/add/:course_id', addTimeLineForOneCourseWithDeletingOldOnes);

router.put('/available/edit', editTimelineAvailable);

router.put('/edit/:course_id', editTimeline);

router.get('/get/:course_id', getTimeLineForOneCourse); // test on postman

module.exports = router;