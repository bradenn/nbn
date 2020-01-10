let router = require('express').Router();
const config = require("../config.json");
const nodemailer = require("nodemailer");
let User = require('../models/user');

let transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.post, // 587
    secure: config.email.secure, // true for 465, false for other ports
    auth: {
      user:  config.email.user, // generated ethereal user
      pass:  config.email.pass // generated ethereal password
    },
    tls: {
            rejectUnauthorized: false
        }
  });

router.get('/r/:red', function(req, res) {
    User.findById(req.session.userId, function(err, user) {
    const c = makeid(12);
        sendEmail(user.email, c);
        user.authcode = c;
        user.save((usr) => {
            if(req.params.red === "home")
                res.redirect("/");
            else
                res.redirect("/"+req.params.red);
        });
    });
});
router.get('/verify/:authcode', function(req, res) {
    User.findById(req.session.userId, function(err, user) {
        if(req.params.authcode === user.authcode){
            user.verified = true;
             user.save((usr) => {
                        res.redirect("/profile");
                    });
        }else{
            req.send("An error has occurred..");
        }

    });
});

function sendEmail(target, code) {
      transporter.sendMail({
        from: '"Namebrand Security" <' + config.email.address + '>',
        to: target,
        subject: "Account Email Verification",
        text: "This email was used to create an account on https://namebrandnews.com Please go here to verify your email: https://"+config.host+"/mail/verify/"+code,
        html: "This email was used to create an account on Namebrand Please click here to verify your email: <a href='https://"+config.host+"/mail/verify/"+code+"'>here</a>"
      }, (err, info) => {
        console.log(info);
      });
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

module.exports = router;