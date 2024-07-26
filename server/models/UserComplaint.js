// models/UserComplaint.js
const mongoose = require('mongoose');

const UserComplaintSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('UserComplaint', UserComplaintSchema);
