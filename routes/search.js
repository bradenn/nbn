let router = require('express').Router();
let User = require('../models/user');
let Post = require('../models/post');

router.get('/', function (req, res, next) {
    let hrTime = process.hrtime();
    User.findById(req.session.userId, function (err, user) {
        Post.find({
                $or: [{
                    "title": {
                        "$regex": req.query.q,
                        "$options": 'i'
                    }
                }, {
                    "body": {
                        "$regex": req.query.q,
                        "$options": 'i'
                    }
                }]
            },
            function (err, posts) {

                User.find({
                        "username": {
                            "$regex": req.query.q,
                            "$options": 'i'
                        }
                    },

                    function (err, users) {
                        let hrTimeE = process.hrtime();
                        return res.render("search", {
                            title: "Search",
                            user: user,
                            posts: posts,
                            query: req.query.q,
                            users: users,
                            time: Math.round((hrTimeE[0] * 1000 + hrTimeE[1] / 1000000) - (hrTime[0] * 1000 + hrTime[1] / 1000000))/1000
                        });
                    });

            });

    });
});

module.exports = router;
