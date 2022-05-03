const { Schema } = require('mongoose');

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

module.exports = projectSchema;