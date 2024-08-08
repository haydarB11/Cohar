const {
	editQuestion,
	deleteQuestion,
	getAllQuestionsForOneQuiz,
	addQuestionWithItsAnswers,
} = require('../../controllers/ManagerControllers/QuestionController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
const { uploadQuestion } = require('../../utils/multer/uploadDestinations');

router.use(isAuth);

// router.post('/add', addQuestion);
router.post('/add', uploadQuestion.single('file'), addQuestionWithItsAnswers);

router.put('/edit/:question_id', uploadQuestion.single('file'), editQuestion);
// router.put('/edit/:question_id', editQuestion);

router.delete('/delete/:question_id', deleteQuestion);

router.get('/get-all/:quiz_id', getAllQuestionsForOneQuiz);

module.exports = router;