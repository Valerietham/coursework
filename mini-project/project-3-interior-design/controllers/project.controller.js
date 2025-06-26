const ProjectService = require('../services/project.service');

module.exports = {
  getAllProjects: (req, res) => ProjectService.getAllProjects(req, res),
  getProjectById: (req, res) => ProjectService.getProjectById(req, res),
};
