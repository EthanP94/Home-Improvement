const { Schema, model } = require('mongoose');

const employeeSchema = require('./Employee');

const clientSchema = require('./Client');

const projectSchema = new Schema({

  id: {
    type: String,
    required: true,
  },
  scopeOfWork: {
    type: String,
  },
  estimatedWorkTime: {
    type: String,
  },
  price: {
    type: Number,
  },
  
  assignedEmployees: [employeeSchema],

  client: [clientSchema]
});

const Project = model('Project', projectSchema);

module.exports = Project;