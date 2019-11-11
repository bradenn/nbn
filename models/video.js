let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');

// Define schema for `video` database collection
let VideoSchema = new mongoose.Schema({
  title: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    autopopulate: true
  },
  body: String,
  link: String,
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
  published: {
    type: Boolean,
    default: true
  },
  date: String
});

VideoSchema.plugin(autopopulate);

let Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
