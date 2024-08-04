const { createProject, readProject, readAllProjects, updateProject, deleteProject } = require('../controllers/ProjectController');

const ProjectRouter = require('express').Router();

ProjectRouter.post("/create-project", createProject);
ProjectRouter.get("/read-projects/:id", readProject);
ProjectRouter.get("/read-projects-all/:clerkID", readAllProjects);
ProjectRouter.put("/update-project", updateProject);
ProjectRouter.delete("/delete-project", deleteProject);

module.exports = ProjectRouter;
