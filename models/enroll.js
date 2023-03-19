const mongoose = require('mongoose');
const { Schema } = mongoose;

const enrollSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  language: { type: String, required: true },
  enrolled: { type: Boolean, default: false }
});

const Enroll = mongoose.model('Enroll', enrollSchema);

module.exports = Enroll;
