const {
	getLevelById,
} = require('../../controllers/UserControllers/LevelController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.get('/get/:level_id', getLevelById);

module.exports = router;