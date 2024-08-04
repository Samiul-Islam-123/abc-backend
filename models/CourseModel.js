const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a course
const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: [String],
  content: [
    {
      type: String,
        required : true
    },
  ],
  studentsEnrolled: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number, // in minutes
    required: true,
  },
});

const courseModel = new mongoose.model('courses', CourseSchema);

module.exports = courseModel;