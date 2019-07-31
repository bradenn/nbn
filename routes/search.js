var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    if (user != null) {
      Topic.find({
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
        function(err, topics) {
          return res.render("search", {
            title: "Search",
            user: user,
            topics: topics,
            query: req.query.q
          });
        });

    } else {
      return res.redirect("/login");
    }
  });
});

module.exports = router;
