const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  Teachers: { type: String, required: true }
}, { collection: 'EventForAll' }); // Specify the collection name as 'EventForAll'

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
