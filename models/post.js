let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');

// Define schema for `post` database collection
let PostSchema = new mongoose.Schema({
  title: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  },
  body: String,
  picture: String,
  section: {
    type: String,
    enum: ['us', 'world', 'politics', 'business', 'tech', 'health', 'entertainment', 'opinion', 'history'],
    default: 'us'
  },
  tags: [String],
  desc: String,
  views: {
    type: Number,
    default: "0"
  },
  standing: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: false
  },
  nsfw: {
    type: Boolean,
    default: false
  },
  date: String
});

PostSchema.plugin(autopopulate);

let Post = mongoose.model('Post', PostSchema);

module.exports = Post;
