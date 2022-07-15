const mongoose = require('mongoose');

const { Schema } = mongoose;

// set up a mongoose model
module.exports = mongoose.model(
  'User',
  new Schema({
    name: String,
    password: String,
    admin: Boolean,
  }),
);
