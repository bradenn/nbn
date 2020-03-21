var router = require('express').Router();
let User = require('../models/user');
let Post = require('../models/post');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    var e = {};
    Post.find(e, function(err, posts) {
      return res.render("moderate", {
        title: "Moderation",
        user: user,
        posts: posts
      });
    }).sort({
      _id: -1
    });
  });
});

router.get('/flag/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Post.findById(req.params.id, function(err, post) {
      post.standing += 1;
      post.save(function(err) {
        res.redirect(req.get('referer'));
      });
    });
  });
});

router.get('/publish/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Post.findById(req.params.id, function(err, post) {
      post.published = true;
      post.save(function(err) {
        res.redirect(req.get('referer'));
      });
    });
  });
});

router.get('/unpublish/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    Post.findById(req.params.id, function(err, post) {
      post.published = false;
      post.save(function(err) {
        res.redirect(req.get('referer'));
      });
    });
  });
});

router.get('/delete/:id', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    if (user.account == "admin" || user.account == "superadmin" || user.account == "writer") {
      Post.deleteOne({
        _id: req.params.id
      }, function(err) {
        res.redirect("/");
      });
    } else {
      var ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
      res.send("<b>You have attempted to breach security.</b> Your IP address [" + ip + "] has been logged and forwarded to IC3. Any further tampering will result in your client being blacklisted.");
    }
  });
});

module.exports = router;
