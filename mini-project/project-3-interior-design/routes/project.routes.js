const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/project.controller');

// 1. Get all projects, get projects by status - GET /projects?status=Completed
router.get('', ProjectController.getAllProjects);
// 2. Get project by project ID - GET /projects/:id
router.get('/:project_id', ProjectController.getProjectById);

module.exports = router;
