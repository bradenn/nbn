var router = require('express').Router();
let User = require('../models/user');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    User.find({}, function(err, users) {
      User.findOne({username: req.query.target}, function(err, target) {
        return res.render("admin", {
          title: "Admin",
          user: user,
          users: users,
          target: target
        });
      });
    });
  });
});

router.post('/account/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    User.findById(req.params.id, function(err, target) {
      if(user.account.toString() == "admin" || user.account.toString() == "superadmin"){
        target.account = req.body.type;
        target.save(function(err){
          res.redirect(req.get('referer'));
        });
      }

    });
  });
});

module.exports = router;
