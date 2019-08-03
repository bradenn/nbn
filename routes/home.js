var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    var e = {};
    if(req.query.s == "following") e = {'owner': { $in: user.following }};
    if (user != null) {
        Topic.find(e, function(err, topics) {
          return res.render("home", {
            title: "Home",
            user: user,
            topics: topics,
            query: req.query.s
          });
        });

    }else{
      return res.redirect("/login");
    }
  });
});

module.exports = router;
