let router = require('express').Router();
let User = require('../models/user');
let Post = require('../models/post');
let Comment = require('../models/comment');

router.get('/:id', function (req, res) {
    User.findById(req.session.userId, function (err, user) {
        User.findOne({"username": req.params.id}, function (err, target) {
            Post.find({
                $and: [{
                    'owner': target._id
                }, {
                    'published': true
                }]
            }, function (err, posts) {
                Comment.find({
                    user: target._id
                }, function (err, comments) {
                    User.find({
                        "following.id": {
                            "$in": [target._id]
                        }
                    }, function (err, followers) {
                        return res.render("user", {
                            title: "User",
                            user: user,
                            target: target,
                            posts: posts,
                            comments: comments,
                            followers: followers
                        });
                    });

                });
            });

        });
    });
});

router.get('/mod/:action/:id', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        User.findById(req.params.id, function (err, target) {
            if (user.account == "superadmin") {
                switch (req.params.action) {
                    case 'ban':
                        target.account = 'banned';
                        target.save(function (err) {

                        });
                        break;
                    case 'unban':
                        target.account = 'user';
                        target.save(function (err) {

                        });
                        break;
                }
                res.redirect(req.get('referer'));
            }
        });
    });
});

router.get('/:id/:status', function (req, res, next) {

    User.findById(req.session.userId, function (err, user) {
        if (req.params.status === "follow") {
            user.following += req.params.id;
            user.save(() => {
                res.redirect(req.get('referer'));
            });
        } else if (req.params.status === "unfollow") {
            User.findOneAndUpdate(req.session.userId, { $pull: {"following": req.params.id} }, () => {
                res.redirect(req.get('referer'));
            });
        }
    });
});

module.exports = router;
