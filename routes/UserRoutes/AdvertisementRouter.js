const {
	getAllAdvertisements,
} = require('../../controllers/UserControllers/AdvertisementController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.get('/', getAllAdvertisements);

module.exports = router;