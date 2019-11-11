let router = require('express').Router();
let User = require('../models/user');
let Video = require('../models/video');

// Collect queries for /video/* in the GET fashion
router.get("/:id", (req, res) => {
    let videoId = req.params.id;
    User.findById(req.session.userId, (err, user) => {
       Video.findById(videoId, (err, video) => {
           if(err) return res.redirect("/404");
           // Send user to the 404 page if the video isn't published
           if(!video.published && user.account === "user") return res.redirect("/404");
           // Send the user to the EJS page to render the video
           return res.render("video", {
               title: video.title,
               video: video,
               user: user
           });
       });
    });
});

module.exports = router;
