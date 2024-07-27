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
  subRegion: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
}, { timestamps: true });

module.exports = mongoose.model('UserComplaint', UserComplaintSchema);