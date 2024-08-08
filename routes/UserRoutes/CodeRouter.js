const {
	relateCodeWithStudent,
} = require('../../controllers/UserControllers/CodeController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.put('/edit', relateCodeWithStudent);

module.exports = router;