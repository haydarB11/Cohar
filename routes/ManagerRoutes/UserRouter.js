const {
	userRegister,
	managerLogin,
	editUser,
	getAllUsersWithTheirMarksForOneCourse,
	getAllUsersWithAttemptsOnly,
	editOwnAccount,
	deleteUser,
} = require('../../controllers/ManagerControllers/UserController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.post('/login', managerLogin);

router.use(isAuth);

router.post('/add', userRegister);

router.put('/edit', editOwnAccount);

router.put('/edit/:user_id', editUser);

router.delete('/delete/:user_id', deleteUser);

router.get('/students/get-all/:course_id', getAllUsersWithTheirMarksForOneCourse);

// router.get('/students/get-one/:course_id', getOneStudentWithAllMarksForOneCourse);

router.get('/illegal-students/get-all', getAllUsersWithAttemptsOnly);

module.exports = router;