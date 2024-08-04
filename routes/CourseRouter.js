const { CreateCourse, ReadCourse, UpdateCourse, DeleteCourse, ReadAllCourses } = require('../controllers/CourseController');

const CourseRouter = require('express').Router();

CourseRouter.post("/create-course", CreateCourse);
CourseRouter.get("/read-courses", ReadCourse);
CourseRouter.get("/read-courses-all", ReadAllCourses);
CourseRouter.put("/update-course",UpdateCourse);
CourseRouter.delete("/delete-course",DeleteCourse);


module.exports = CourseRouter;