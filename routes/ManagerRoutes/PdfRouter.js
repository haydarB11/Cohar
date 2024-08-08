const {
	addPdf, 
	deletePdf,
	// getPdf
} = require('../../controllers/ManagerControllers/PdfController');
const router = require('express').Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
const { uploadPDF } = require('../../utils/multer/uploadDestinations');

router.use(isAuth);

// router.post('/add', addPdf);
router.post('/add', uploadPDF.single('pdf'), addPdf);

router.delete('/delete/:pdf_id', deletePdf);

// router.get('/get/:pdf_id', getPdf);

module.exports = router;