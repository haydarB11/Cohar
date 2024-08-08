const {
	// getPdf
} = require('../../controllers/UserControllers/PdfController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

// router.get('/get/:id', getPdf);

module.exports = router;