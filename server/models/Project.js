const { Schema, model } = require('mongoose');

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