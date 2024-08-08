const { 
	addQuizStudent,
	addStartingQuizStudent,
} = require('../../controllers/UserControllers/QuizStudentController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.post('/add', addQuizStudent);

router.post('/add/determine-level', addStartingQuizStudent);

module.exports = router;