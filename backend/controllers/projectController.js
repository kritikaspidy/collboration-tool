const Project = require('../models/Project');

// Create new project
const createProject = async (data) => {
  const project = new Project(data);
  return await project.save();
};

// Get all projects
const getProjects = async () => {
  return await Project.find().populate('createdBy').populate('collaborators');
};

// Update project
const updateProject = async (id, data) => {
  return await Project.findByIdAndUpdate(id, data, { new: true });
};

// Delete project
const deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject
};
