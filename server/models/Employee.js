const { Schema, model } = require('mongoose');

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
    unique: true,
    match: [/.+@.+\..+/, "Must use a valid email address"],
  },
  phoneNumber: {
    type: String,
  },
  setProjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Project'
    }
  ]
});

const Employee = model('Employee', employeeSchema);

module.exports = Employee;