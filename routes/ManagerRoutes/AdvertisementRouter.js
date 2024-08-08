const {
	addAdvertisement,
	editAdvertisement,
	deleteAdvertisement,
	getAllAdvertisements,
} = require('../../controllers/ManagerControllers/AdvertisementController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
const { uploadAdvertisement } = require('../../utils/multer/uploadDestinations');

router.use(isAuth);

router.post('/',  uploadAdvertisement.single('image'), addAdvertisement);

router.put('/:advertisement_id',  uploadAdvertisement.single('image'), editAdvertisement);

router.delete('/', deleteAdvertisement);

router.get('/', getAllAdvertisements);

module.exports = router;