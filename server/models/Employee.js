const { Schema, model } = require('mongoose');

const projectSchema = require('./Project');

const employeeSchema = new Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  expertise: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  setProjects: [projectSchema]
});

const Employee = model('Employee', employeeSchema);

module.exports = Employee;