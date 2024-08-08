const {
	userRegister,
	userLogin,
	editUser,
	getAllManagersForEnrolledCourses,
	getAllManagersForEnrolledCoursesWhichHaveMessages,
	getOneUser,
	increaseNumberOfIllegalAttemptsToConnect,
	getToken,
} = require('../../controllers/UserControllers/UserController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/jwtMiddleware');

router.post('/register', userRegister);

router.post('/login', userLogin);

router.use(isAuth);

router.put('/edit', editUser);

router.put('/token', getToken);

router.put('/attempts/increase', increaseNumberOfIllegalAttemptsToConnect)

router.get('/managers/get-all', getAllManagersForEnrolledCourses)

router.get('/managers/chats/get-all', getAllManagersForEnrolledCoursesWhichHaveMessages)

router.get('/get', getOneUser)

module.exports = router;