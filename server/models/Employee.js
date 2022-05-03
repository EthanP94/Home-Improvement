const { Schema } = require('mongoose');

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

module.exports = employeeSchema;