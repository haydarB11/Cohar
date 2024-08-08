const { 
	addExerciseAnswer, 
	editExerciseAnswer,
	deleteExerciseAnswer,
	getAllExerciseAnswersForOneExercise,
} = require('../../controllers/ManagerControllers/ExerciseAnswerController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.post('/add', addExerciseAnswer);

router.put('/edit/:exercise_answer_id', editExerciseAnswer);

router.delete('/delete/:exercise_answer_id', deleteExerciseAnswer);

router.get('/get-all/:exercise_question_id', getAllExerciseAnswersForOneExercise);

module.exports = router;