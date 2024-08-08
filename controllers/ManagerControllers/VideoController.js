const { VideoService } = require('../../services/VideoService');



module.exports = {

    addVideo: async (req, res) => {
        const data = req.body;
        const result = await new VideoService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    addVideoToServer: async (req, res) => {
        const data = req.body;
        data.level_id = req.body.level_id;
        data.url = req.file?.path;
        const result = await new VideoService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    uploadToDrive: async (req, res) => {
        const data = req.body;
        const result = await new VideoService(data).add();
        res.status(result.status).send({
            data: result.data,
        });
    },

    deleteVideo: async (req, res) => {
        const result = await VideoService.delete(req.params.video_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getAllVideosForOneCourse: async (req, res) => {
        const result = await VideoService.getForOneLevel(req.params.level_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getVideo: async (req, res) => {
        const result = await VideoService.get(req.params.id);
        res.status(200).send(__dirname + "url" + result.data);
    },

}