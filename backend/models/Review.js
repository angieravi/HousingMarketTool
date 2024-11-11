const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  renterName: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
});

module.exports = mongoose.model('Review', ReviewSchema);
