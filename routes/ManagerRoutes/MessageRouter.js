const { 
	sendMessage,
	editMessage,
	deleteMessage,
	getInbox,
	getOutbox,
} = require('../../controllers/ManagerControllers/MessageController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.post('/add', sendMessage);

router.put('/edit/:message_id', editMessage);

router.delete('/delete/:message_id', deleteMessage);

router.get('/get-inbox', getInbox);

router.get('/get-outbox', getOutbox);

module.exports = router;