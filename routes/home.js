var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    if (user != null) {
        Topic.find({}, function(err, topics) {
          return res.render("home", {
            title: "Home",
            user: user,
            topics: topics
          });
        });

    }else{
      return res.redirect("/login");
    }
  });
});

module.exports = router;
