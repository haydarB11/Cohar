const { 
	addOrderLecture,
	addManyOrderLectures
} = require('../../controllers/UserControllers/OrderLectureController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.post('/add', addOrderLecture);

router.post('/add-many', addManyOrderLectures);

module.exports = router;