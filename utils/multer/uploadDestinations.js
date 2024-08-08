const { upload } = require('./multerUpload');

const uploadAdvertisement = upload('public/Advertisements');
const uploadVideo = upload('public/videos');
const uploadCourse = upload('public/courses');
const uploadPDF = upload('public/pdf');
const uploadQuestion = upload('public/questions');

module.exports = {
    uploadAdvertisement,
    uploadVideo,
    uploadCourse,
    uploadPDF,
    uploadQuestion
};