const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectDetails: {
    type: String,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  category: { type: String, required: true },
  assignedTo: { type: [Object], required: true },
  issues: { type: [Object], required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Project', projectSchema);
