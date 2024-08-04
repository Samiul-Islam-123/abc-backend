const CourseModel = require('../models/CourseModel');

// Create a new course
const CreateCourse = async (req, res) => {
  const { title, description, instructor, category, tags, content, duration } = req.body;
  if (title && description && instructor && category && content && duration) {
    try {
      const courseData = new CourseModel({
        title: title,
        description: description,
        instructor: instructor,
        category: category,
        tags: tags,
        content: content,
        duration: duration,
      });

      // Save the courseData
      await courseData.save();

      return res.json({
        success: true,
        message: 'New course created successfully',
      });
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        message: 'Server error :(',
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Insufficient data',
    });
  }
};

// Get all courses
const ReadAllCourses = async (req, res) => {
  try {
    // Fetching all courses
    const courses = await CourseModel.find();

    return res.json({
      success: true,
      message: 'Courses fetched successfully',
      courses: courses,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: 'Internal server error :(',
    });
  }
};

// Get a course by ID
const ReadCourse = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const course = await CourseModel.findById(id);

      if (course) {
        return res.json({
          success: true,
          message: 'Course fetched successfully',
          course: course,
        });
      } else {
        return res.json({
          success: false,
          message: 'Course not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        message: 'Server error :(',
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Insufficient data',
    });
  }
};

// Update a course by ID
const UpdateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, instructor, category, tags, content, duration, isPublished, rating } = req.body;
  if (id) {
    try {
      const updatedData = {};
      if (title) updatedData.title = title;
      if (description) updatedData.description = description;
      if (instructor) updatedData.instructor = instructor;
      if (category) updatedData.category = category;
      if (tags) updatedData.tags = tags;
      if (content) updatedData.content = content;
      if (duration) updatedData.duration = duration;
      if (isPublished !== undefined) updatedData.isPublished = isPublished;
      if (rating !== undefined) updatedData.rating = rating;
      updatedData.updatedAt = Date.now();

      const updatedCourse = await CourseModel.findByIdAndUpdate(id, updatedData, { new: true });

      if (updatedCourse) {
        return res.json({
          success: true,
          message: 'Course updated successfully',
          course: updatedCourse,
        });
      } else {
        return res.json({
          success: false,
          message: 'Course not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        message: 'Server error :(',
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Insufficient data',
    });
  }
};

// Delete a course by ID
const DeleteCourse = async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const deletedCourse = await CourseModel.findByIdAndDelete(id);

      if (deletedCourse) {
        return res.json({
          success: true,
          message: 'Course deleted successfully',
        });
      } else {
        return res.json({
          success: false,
          message: 'Course not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.json({
        success: false,
        message: 'Server error :(',
      });
    }
  } else {
    return res.json({
      success: false,
      message: 'Insufficient data',
    });
  }
};

module.exports = {
  CreateCourse,
  ReadAllCourses,
  ReadCourse,
  UpdateCourse,
  DeleteCourse,
};
