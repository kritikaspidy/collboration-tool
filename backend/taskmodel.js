const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { 
    type: String,
    enum: ['To Do', 'In Progress', 'Completed'],
    default: 'To Do'
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  assignedUsers: [{ type: String }], // Array of user IDs as strings (mocked)
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Task', taskSchema);
