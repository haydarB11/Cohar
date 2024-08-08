const { 
	getAllOrderedLecture,
	editOrderLecture,
} = require('../../controllers/ManagerControllers/OrderLectureController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.get('/get-all', getAllOrderedLecture);

router.put('/update-status/:order_id', editOrderLecture);

module.exports = router;