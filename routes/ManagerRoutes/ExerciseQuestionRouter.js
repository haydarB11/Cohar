const { 
	addQuestion, 
	editQuestion,
	deleteQuestion,
	getAllExerciseQuestions,
} = require('../../controllers/ManagerControllers/ExerciseQuestionController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
const { uploadQuestion } = require('../../utils/multer/uploadDestinations');

router.use(isAuth);

router.put('/edit/:exercise_question_id', uploadQuestion.single('file'), editQuestion);

router.use(uploadQuestion.single('file'));

router.post('/add', addQuestion);

router.delete('/delete/:exercise_question_id', deleteQuestion);

router.get('/get-all/:question_id', getAllExerciseQuestions);

module.exports = router;