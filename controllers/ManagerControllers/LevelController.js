const { LevelService } = require('../../services/LevelService');
const { PdfService } = require('../../services/PdfService');
const { VideoService } = require('../../services/VideoService');
const { FactoryHelper } = require('../../utils/helper/FactoryHelper');
const httpStatus = require('../../utils/httpStatus');
const { sequelize } = require('../../models');
const { google } = require('googleapis');
const fs = require('fs');


module.exports = {

    addLevelWithPdf: async (req, res) => {
        const t = await sequelize.transaction();

        try {
                // async (t) => {
                const level = await new LevelService(req.body).add(t);
                if (level.status === httpStatus.BAD_REQUEST) {
                    return {
                        data: "bad request or something wrong happend1",
                        status: httpStatus.BAD_REQUEST
                    };
                } else if (req.body.files) {
                    const factoredPdfs = FactoryHelper.relateLevelWithPdf(level.data.id, req.body.files);
                    const pdfs = await PdfService.addAll(factoredPdfs, t);
                    if (pdfs.status == httpStatus.BAD_REQUEST) {
                        res.status(httpStatus.BAD_REQUEST).send({
                            data: "bad request or something wrong happend2",
                        });
                    }
                }
                if (req.body.videos) {
                    const factoredVideos = FactoryHelper.relateLevelWithVideos(level.data.id, req.body.videos);
                    const videos = await VideoService.addAll(factoredVideos, t);
                    if (videos.status == httpStatus.BAD_REQUEST) {
                        res.status(httpStatus.BAD_REQUEST).send({
                            data: "bad request or something wrong happend3",
                        });
                    }
                }
                await t.commit();
                res.status(level.status).send({
                    data: 'added successfully',
                });
        } catch (error) {
            res.status(httpStatus.BAD_REQUEST).send({
                data: error.message,
            });
        }
    },
    
    deleteLevel: async (req, res) => {
        const result = await LevelService.delete(req.params.level_id);
        res.status(result.status).send({
            data: result.data,
        });
    },

    getLevelById: async (req, res) => {
        const result = await LevelService.getById(req.params.level_id);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    editLevel: async (req, res) => {
        const data = req.body;
        data.level_id = req.params.level_id;
        const result = await LevelService.edit(data);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    getAllLevelsForOneCourse: async (req, res) => {
        const result = await LevelService.getAllForOneCourse(req.params.course_id);
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    getAllLevels: async (req, res) => {
        const result = await LevelService.getAll();
        res.status(result.status).send({
            data: result.data,
        });
    },
    
    uploadVideoToYouTube: async (req, res) => {
        try {
            const youtube = google.youtube({
                version: 'v3',
                auth: 'AIzaSyDXBjFbF7eQDFnQcmJ_WlrIxIkSsA_M4uo'
            });
            console.log(youtube);
            const video = req.file;
            const result = await youtube.videos.insert({
                part: 'snippet,status',
                requestBody: {
                    snippet: {
                        title: "title",
                        description: "description"
                    },
                    status: {
                        privacyStatus: 'private'
                    }
                },
                media: {
                    body: fs.createReadStream(video.path)
                }
            });
            console.log(result);
            const videoId = result.data.id;
            console.log(videoId);
            res.status(200).send({
                data: "done",
            });
            return videoId;
        } catch (error) {
            res.status(405).send({
                data: error.message,
            });
        }
    },

}