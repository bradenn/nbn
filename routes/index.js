const config = require("../config.json");
let express = require('express');
let router = express.Router();


router.use("/", require("./home"));
router.use("/u", require("./user"));
router.use("/mail", require("./mail"));
for(let i in config.pages){
  let page = config.pages[i];
  router.use("/"+page, require("./"+page));
}



// Handle simple logout requests
// TODO: Should be handled in another class
router.get('/logout', function (req, res, next) {
    if (req.session) {
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;
