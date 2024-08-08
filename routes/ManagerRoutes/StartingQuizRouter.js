const {
	addQuiz,
	deleteQuiz,
	editQuiz,
	getOneQuizWithAllItsRelatives,
	getAllQuizForOneCourse,
} = require('../../controllers/ManagerControllers/StartingQuizController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.post('/add', addQuiz);

router.delete('/delete/:quiz_id', deleteQuiz);

router.put('/edit/:quiz_id', editQuiz);

router.get('/get/:quiz_id', getOneQuizWithAllItsRelatives);

router.get('/get-all/:course_id', getAllQuizForOneCourse);

module.exports = router;