let express = require('express');
let router = express.Router();
let Post = require('../models/post');

router.get('/:section', async (req, res) => {
    let posts = await Post.find({section: {$in: [req.params.section]}, published: true}).sort({_id: -1}).exec();
    res.render("section", {posts: posts});
});

module.exports = router;
