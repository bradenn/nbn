let router = require('express').Router();
let User = require('../models/user');
let Post = require('../models/post');
let Video = require('../models/video');

router.get('/:type', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {

        // Send unauthorized entities to hell
        if (user == null) return res.redirect("/login");
        if (user.account === "user") return res.redirect("/login");

        // Sort query to correct return
        if (req.params.type === "article") {
            return res.render("newarticle", {
                title: "New Article",
                user: user
            });
        } else if (req.params.type === "video") {
            return res.render("newvideo", {
                title: "New Video",
                user: user
            });
        }

    });
});

router.post('/video', (req, res) => {

    let tags = req.body.tags;
    let tagArray = tags.split(" ");
    let bodyText = req.body.body;


    let videoData = {
        title: req.body.title,
        owner: req.session.userId,
        body: req.body.body,
        desc: req.body.desc,
        section: req.body.section,
        link: req.body.link,
        tags: tagArray,
        views: 0,
        date: new Date()
    };

    Video.create(videoData, function (error, video) {
        if (error) {

        } else {
            return res.redirect("/watch/" + video._id);
        }
    });

});

const upload = require('../services/aws-upload');
const singleUpload = upload.single('image');


router.post('/post', upload.single('image'), function (req, res, next) {

    let img = (typeof req.file == "undefined") ? req.body.link : req.file.location;

    let tags = req.body.tags;
    let tagArray = tags.split(" ");
    let bannedWords = require("../banned-words.json");

    let standing = 0;
    let bodyText = req.body.body;


    let postData = {
        title: req.body.title,
        owner: req.session.userId,
        body: req.body.body,
        picture: img,
        desc: req.body.desc,
        published: true,
        section: req.body.section,
        caption: req.body.caption,
        standing: standing,
        tags: tagArray,
        views: 0,
        nsfw: (req.body.nsfw),
        date: new Date()
    };

    Post.create(postData, function (error, post) {
        if (error) {

        } else {
            return res.redirect("/post/" + post._id);
        }
    });

});

function getRand(t) {
    let c = t.length;
    let z = Math.floor(Math.random() * c);
    return t[z];
}

module.exports = router;
