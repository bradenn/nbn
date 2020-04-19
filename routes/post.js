let router = require('express').Router();
let User = require('../models/user');
let Post = require('../models/post');
let Comment = require('../models/comment');
let Notifications = require('../models/notifications');

router.get('/:post', async (req, res) => {
    const post = await Post.findById(req.params.post).exec();
    const comments = await Comment.find({post: post._id}).sort({_id: -1}).exec();
    post.views++;
    post.save(p => {
        return res.render("post", {
            post: post,
            comments: comments
        });
    });
});

router.get('/edit/:id', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        Post.findById(req.params.id, function (err, post) {
            if (post.owner._id.toString() != user._id.toString() && user.account != "admin" && user.account != "superadmin") res.redirect(req.get('referer'));
            return res.render("edit", {
                title: "edit",
                user: user,
                post: post
            });
        });
    });
});

router.post('/edit/existing/:id', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        Post.findById(req.params.id, function (error, post) {
            if (user.account == "superadmin" || user._id == post.owner) {

                post.title = req.body.title;
                if (req.body.body != "") {
                    post.body = req.body.body;
                }

                post.desc = req.body.desc;

                post.save(function (s) {
                    return res.redirect("/post/" + post._id);
                });
            }
        });
    });

});


router.post('/:id/comment', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        let userData = {
            text: req.body.text,
            post: req.params.id,
            user: user._id,
            date: new Date()
        };
        Post.findById(req.params.id, function (err, post) {
            Comment.create(userData, function (error, comment) {
                let notificationData = {
                    title: "New Comment",
                    type: "interaction",
                    message: user.username + " wrote '" + comment.text + "' on your article.",
                    redict: "/post/" + post._id,
                    date: new Date()
                };
                Notifications.create(notificationData, function (error, notification) {
                    User.findById(post.owner, function (err, owner) {
                        owner.notifications.push(notification);
                        owner.save(function (err) {
                            res.redirect(req.get('referer'));
                        });
                    });
                });
            });
        });
    });
});


router.get('/:id/:opt', function (req, res, next) {
    User.findById(req.session.userId, function (err, user) {
        Post.findById(req.params.id, function (err, post) {
            if (req.params.opt == "save") {
                user.saved.push(post._id);
                user.save(function (err) {
                    res.redirect(req.get('referer'));
                });
            }
            if (req.params.opt == "unsave") {
                user.saved.pull(post._id);
                user.save(function (err) {
                    res.redirect(req.get('referer'));
                });
            }
        });
    });
});

module.exports = router;
