let router = require('express').Router();
let User = require('../models/user');
let Topic = require('../models/topic');

router.get('/', function(req, res, next) {
  User.findById(req.session.userId, function(err, user) {
    if (user == null) return res.redirect("/login");
    return res.render("new", {
      title: "New",
      user: user
    });
  });
});

const upload = require('../services/aws-upload');
const singleUpload = upload.single('image');

router.post('/topic', upload.single('image'), function(req, res, next) {

  var topicData = {
    title: req.body.title,
    owner: req.session.userId,
    body: req.body.body,
    picture: req.file.location,
    section: req.body.section,
    date: new Date()
  }

  Topic.create(topicData, function(error, topic) {
    if (error) {

    } else {
      return res.redirect("/topic/" + topic._id);
    }
  });

});

function getRand(t) {
  var c = t.length;
  var z = Math.floor(Math.random() * c);
  return t[z];
}

module.exports = router;
