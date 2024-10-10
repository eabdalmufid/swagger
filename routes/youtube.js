__path = process.cwd();
const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/auth");
const { YoutubeSearch, YoutubeAudio, YoutubeVideo }= require("../config/youtube");

router.get("/", async(req, res) => {
    res.status(400).json({
        author: "Affidev",
        message: "Ooopss, you can go to router /search for more details."
    })
})

/**
 * @swagger
 * 
 * /api/youtube/search:
 *   get:
 *     tags: 
 *       - Youtube
 *     summary: Youtube Search
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: all
 *         schema:
 *           type: string
 *         description: the parameter query for all
 *       - in: query
 *         name: channel
 *         schema:
 *           type: string
 *         description: the parameter query for channel
 *       - in: query
 *         name: playlist
 *         schema:
 *           type: string
 *         description: the parameter query for playlist
 *       - in: query
 *         name: video
 *         schema:
 *           type: string 
 *         description: the parameter query for video
 *     responses:
 *       200:
 *         description: OK
 * 
 * /api/youtube/audio:
 *   get:
 *     tags: 
 *       - Youtube
 *     summary: Youtube Audio
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         description: the parameter query for url
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 * 
 * /api/youtube/video:
 *   get:
 *     tags: 
 *       - Youtube
 *     summary: Youtube Video
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         description: the parameter query for url
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 */
 
router.get("/search", verifyToken, async(req, res) => {
    let channel = req.query.channel
    let video = req.query.video
    let playlist = req.query.playlist
    let all = req.query.all

    if (channel) {
        let result = await YoutubeSearch(channel);
        if (result.channel.length == 0) return res.status(400).json({
            author: "Affidev",
            status: false,
            message: "Channel not found."
        });
        res.status(200).json({
            author: "Affidev",
            status: true,
            result: result.channel
        });
    } else if (video) {
        let result = await YoutubeSearch(video);
        if (result.video.length == 0) return res.status(400).json({
            author: "Affidev",
            status: false,
            message: "Video not found."
        });
        res.status(200).json({
            author: "Affidev",
            status: true,
            result: result.video
        });
    } else if (playlist) {
        let result = await YoutubeSearch(playlist);
        if (result.playlist.length == 0) return res.status(400).json({
            author: "Affidev",
            status: false,
            message: "Playlist not found."
        });
        res.status(200).json({
            author: "Affidev",
            status: true,
            result: result.playlist
        });
    } else if (all) {
        let result = await YoutubeSearch(all);
        res.status(200).json({
            author: "Affidev",
            status: true,
            result
        })
    } else {
        res.status(400).json({
            author: "Affidev",
            status: false,
            message: "Enter parameters, available parameters: channel, video, playlist, all."
        })
    }
});

router.get("/audio", verifyToken, async(req, res) => {
    let url = req.query.url

    let result = await YoutubeAudio(url);
    if (!result) return res.status(400).json({
        author: "Affidev",
        status: false,
        message: "Audio not found."
    });
    res.status(200).json({
        author: "Affidev",
        status: true,
        result
    });
});

router.get("/video", verifyToken, async(req, res) => {
    let url = req.query.url

    let result = await YoutubeVideo(url);
    if (!result) return res.status(400).json({
        author: "Affidev",
        status: false,
        message: "Video not found."
    });
    res.status(200).json({
        author: "Affidev",
        status: true,
        result
    });
});

module.exports = router;