const { 
	getAllMarksForOneStudentInOneCourse,
} = require('../../controllers/ManagerControllers/QuizStudentController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.post('/get-all/:user_id', getAllMarksForOneStudentInOneCourse);

module.exports = router;