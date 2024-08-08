const {
	getOneQuizWithAllItsRelatives,
} = require('../../controllers/UserControllers/QuizController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.get('/get/:quiz_id', getOneQuizWithAllItsRelatives);

module.exports = router;