const { 
	addCourse, 
	editCourse,
	deleteCourse,
	getAllCourses,
	getAllCourseForOneCategory,
} = require('../../controllers/ManagerControllers/CourseController');
const { getAllShowCommentsForOneCourse } = require('../../controllers/ManagerControllers/CommentController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
const { uploadCourse } = require('../../utils/multer/uploadDestinations')

router.use(isAuth);

router.post('/add', uploadCourse.single('image'), addCourse);

router.put('/edit/:course_id', uploadCourse.single('image'), editCourse);

router.delete('/delete/:course_id', deleteCourse);

router.get('/get-all', getAllCourses);

// router.get('/', getAllCourse);

router.get('/comments/:course_id', getAllShowCommentsForOneCourse);

router.get('/get-all-for-category/:category_id', getAllCourseForOneCategory);

module.exports = router;