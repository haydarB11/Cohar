const {
	addLevelWithPdf,
	deleteLevel,
	editLevel,
	getAllLevelsForOneCourse,
	uploadVideoToYouTube,
	getLevelById,
	getAllLevels,
} = require('../../controllers/ManagerControllers/LevelController');
const { getAllVideosForOneCourse } = require('../../controllers/ManagerControllers/VideoController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
// const { upload } = require('../../utils/multer/uploadFiles');

router.use(isAuth);

// router.post('/add', upload.array('pdfs'), addLevelWithPdf);
router.post('/add', addLevelWithPdf);

router.delete('/delete/:level_id', deleteLevel);

router.put('/edit/:level_id', editLevel);

router.get('/get-all/:course_id', getAllLevelsForOneCourse);

router.get('/get-all', getAllLevels);

router.get('/get/:level_id', getLevelById);

// router.post('/youtube', upload.single('video'), uploadVideoToYouTube);

router.get('/videos/:level_id', getAllVideosForOneCourse);

module.exports = router;