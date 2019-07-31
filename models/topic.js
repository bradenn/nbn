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
  date: String
});

TopicSchema.plugin(autopopulate);

var Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;
