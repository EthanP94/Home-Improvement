const { Schema } = require('mongoose');

const clientSchema = new Schema({

  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  homeAddress: {
    type: String
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  setProjects: [projectSchema]
});

module.exports = clientSchema;