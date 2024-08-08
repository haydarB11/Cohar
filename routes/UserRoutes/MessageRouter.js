const { 
	sendMessage,
	getInbox,
	getOutbox,
	getAllMessagesBetweenSpecificUsers
} = require('../../controllers/UserControllers/MessageController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.use(isAuth);

router.post('/add', sendMessage);

router.get('/get-inbox', getInbox);

router.get('/get-outbox', getOutbox);

router.get('/get-all', getAllMessagesBetweenSpecificUsers);

module.exports = router;