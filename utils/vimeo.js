const { Op } = require("sequelize");
const { Video } = require("../models");

const router = require("express").Router();
const isAuth = require("../utils/auth/jwtMiddleware");

let Vimeo = require("vimeo").Vimeo;
// let client = new Vimeo(
//   "",
//   "",
//   ""
// );

const getVideos = () => async (req, res) => {
    client.request(
        {
            method: "GET",
            path: "/me/videos",
        },
        async (error, body, status_code, headers) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                const existingVideoUrls = (await Video.findAll()).map(
                    (video) => video.url
                );
                const newVideos = body.data.filter(
                    (video) => !existingVideoUrls.includes(video.player_embed_url)
                );
                await Video.bulkCreate(
                    newVideos.map((video) => ({
                        title: video.name,
                        url: video.player_embed_url,
                        quality: "auto",
                    }))
                );
                const result = await Video.findAll({
                    where: {
                        level_id: {
                        [Op.eq]: null,
                        },
                    },
                });
                res.status(200).json({ result });
            }
        }
    );
};
router.get("/", isAuth, getVideos());

module.exports = router;
