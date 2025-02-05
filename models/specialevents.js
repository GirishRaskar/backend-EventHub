const mongoose = require('mongoose');

const SpecialSchema = mongoose.Schema({
name: { type: String, required: true },
  description: { type: String, required: true },
  Teachers: { type: String, required: true }
}, { collection: 'SpecialEvent' });

module.exports = mongoose.model('Special', SpecialSchema);
