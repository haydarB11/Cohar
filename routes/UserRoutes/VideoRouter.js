const {
	// getStreamingVideo,
} = require('../../controllers/UserControllers/VideoController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

// router.get('/video/:id', getStreamingVideo);

module.exports = router;