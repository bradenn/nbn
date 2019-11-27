let router = require('express').Router();
let User = require('../models/user');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    return res.render("profile", {
      title: "Profile",
      user: user
    });
  });

});

router.get('/edit/theme/:mode', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    user.theme = req.params.mode;
    user.save(function(err){
      res.redirect(req.get('referer'));
    });
  });

});

module.exports = router;
