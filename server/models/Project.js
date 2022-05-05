const { Schema, model, Types } = require('mongoose');

const projectSchema = new Schema({
  scopeOfWork: {
    type: String,
  },
  estimatedWorkTime: {
    type: String,
  },
  price: {
    type: Number,
  },
  
  assignedEmployees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Employee'
    }
  ],

  client: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    }
  ]
});

const Project = model('Project', projectSchema);

module.exports = Project;