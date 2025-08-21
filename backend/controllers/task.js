
const express = require('express');
const router = express.Router();
const Task = require('../models/taskmodel.js');


const MOCK_USER_ID = 'dummyUserId12345';

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, project, assignedUsers } = req.body;
    if (!title || !project) {
      return res.status(400).json({ message: 'Title and project are required' });
    }
    
    const task = new Task({
      title,
      description,
      project,
      assignedUsers: assignedUsers || [],
      createdAt: new Date()
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get tasks by project
router.get('/project/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Update a task (including status, assigned users, etc.)
router.put('/:taskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    const { title, description, status, assignedUsers } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (status !== undefined) task.status = status;
    if (assignedUsers !== undefined) task.assignedUsers = assignedUsers;

    task.updatedAt = new Date();

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a task
router.delete('/:taskId', async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.taskId);
    if (!deleted) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
