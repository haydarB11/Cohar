const { 
	addAnswer, 
	editAnswer,
	deleteAnswer,
	getAllAnswersForOneQuestion,
} = require('../../controllers/ManagerControllers/AnswerController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.post('/add', addAnswer);

router.put('/edit/:answer_id', editAnswer);

router.delete('/delete/:answer_id', deleteAnswer);

router.get('/get-all/:question_id', getAllAnswersForOneQuestion);

module.exports = router;