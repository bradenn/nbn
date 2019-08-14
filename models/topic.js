const config = require("../config.json");
let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');

// Define schema for `topic` database collection
let TopicSchema = new mongoose.Schema({
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
  views: {
    type: Number,
    default: "0"
  },
  date: String
});

TopicSchema.plugin(autopopulate);

var Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
