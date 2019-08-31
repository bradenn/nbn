var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    var e = {};
    if (req.query.s == "following") e = {
      'owner': {
        $in: user.following
      }
    };
    if (req.query.sec != null) e = {
      'section': {
        $in: req.query.sec
      }
    };
    Topic.find({
      published: false
    }, function(err, topics) {
      Topic.find({
        published: false
      }, function(err, trending) {
        return res.render("home", {
          title: "Home",
          user: user,
          topics: topics,
          trending: trending,
          query: req.query.s,
          sec: req.query.sec
        });
      }).sort({
        views: -1,
        _id: -1
      }).limit(4);
    }).sort({
      _id: -1
    });
  });
});

module.exports = router;
