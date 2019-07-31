var router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');

router.get('/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Topic.findById(req.params.id, function(err, topic) {
      return res.render("topic", {
        title: "Topic",
        user: user,
        topic: topic
      });
    });
  });
});

module.exports = router;
