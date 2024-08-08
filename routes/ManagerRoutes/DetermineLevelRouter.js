const { 
	addDetermineLevel,
	addManyDetermineLevel,
	deleteDetermineLevel,
	editDetermineLevel,
	getAllDetermineLevels,
	getAllDetermineLevelsForOneCourse
} = require('../../controllers/ManagerControllers/DetermineLevelController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
const { uploadCourse } = require('../../utils/multer/uploadDestinations')

router.use(isAuth);

router.post('/', addDetermineLevel);

router.post('/add-many/:starting_quiz_id', addManyDetermineLevel);

router.put('/:determine_level_id', editDetermineLevel);

router.delete('/', deleteDetermineLevel);

router.get('/', getAllDetermineLevels);

router.get('/course/:course_id', getAllDetermineLevelsForOneCourse);

module.exports = router;