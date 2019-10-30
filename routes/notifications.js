var router = require('express').Router();
var User = require('../models/user');


router.get('/clear', function(req, res) {
  User.findById(req.session.userId, function(err, user) {
    // TODO: Find a better way to clear notifications. This is a binary action.
    user.notifications = [];
    user.save(function(err) {
    // Lets find a way to make this a dynamic task.
    // We shoudn't require rediction at this level.
      res.redirect(req.get('referer'));
    });
  });
});

module.exports = router;
