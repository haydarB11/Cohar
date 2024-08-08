const {
	addManyCodes,
	editCode,
	getAllCodesForOneCourse
} = require('../../controllers/ManagerControllers/CodeController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');

router.use(isAuth);

router.post('/add-many', addManyCodes);

router.put('/edit/:code_id', editCode);

router.get('/get-all/:course_id', getAllCodesForOneCourse);

module.exports = router;