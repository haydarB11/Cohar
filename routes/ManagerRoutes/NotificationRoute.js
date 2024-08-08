const {	sendNotification, getNotification } = require('../../controllers/ManagerControllers/Notification');

const router = require('express').Router();

const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.post('/', sendNotification);

router.get('/', getNotification);


module.exports = router;