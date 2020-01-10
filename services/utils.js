let User = require('../models/user');
module.exports = {
    getRouteWithUser: function (target, router, callback) {
        router.get(target, function (req, res) {
            User.findById(req.session.userId, function (err, user) {
                callback(req, res, user, err);
            });
        });
    }
};