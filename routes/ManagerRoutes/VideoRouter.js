const {
  addVideo,
  deleteVideo,
  getVideo,
  // redirectToAuthUrl,
  // getStreamingVideo,
  // getToken,
  // getSizeOfFile,
  addVideoToServer,
} = require("../../controllers/ManagerControllers/VideoController");
const router = require("express").Router();
const isAuth = require('../../utils/auth/AdminJwtMiddleware');
const { uploadVideo } = require("../../utils/multer/uploadDestinations");

function extendTimeout(req, res, next) {
  // adjust the value for the timeout, here it's set to 3 minutes
  res.setTimeout(18000000, () => {
    // you can handle the timeout error here })
    next();
  });
}
// router.get("/redirect-uri", redirectToAuthUrl);

// router.get("/", getToken);

router.use(isAuth);

// router.get("/video/:id", getStreamingVideo);

// router.get("/size/:id", getSizeOfFile);

router.post("/add", addVideo);

router.delete("/delete/:video_id", deleteVideo);

router.post(
  "/upload-to-server",
  //   extendTimeout,
  uploadVideo.single("video"),
  addVideoToServer
);

router.get("/get/:id", getVideo);

module.exports = router;
