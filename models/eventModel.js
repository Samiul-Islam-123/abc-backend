const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for an event
const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
});

const EventModel = mongoose.model('events', EventSchema);

module.exports = EventModel;
