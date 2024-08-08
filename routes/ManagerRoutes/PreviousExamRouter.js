const {
	addPreviousExam, 
	deletePreviousExam,
	getAllPreviousExamForOneCourse,
} = require('../../controllers/ManagerControllers/PreviousExamController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
const { uploadPDF } = require('../../utils/multer/uploadDestinations');

router.use(isAuth);

// router.post('/add', addPreviousExam);
router.post('/add', uploadPDF.single('pdf'), addPreviousExam);

router.delete('/delete/:previous_exam_id', deletePreviousExam);

router.get('/get-all/:course_id', getAllPreviousExamForOneCourse);

module.exports = router;