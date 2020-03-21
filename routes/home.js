let express = require('express');
let router = express.Router();
let Post = require('../models/post');
let Video = require('../models/video');

router.get('/', async (req, res, next) => {
    let posts = await Post.find({published: true}).sort({_id: -1}).exec();
    let videos = await Video.find({published: true}).exec();
    return res.render('home', {posts: posts, videos: videos});
});

module.exports = router;
