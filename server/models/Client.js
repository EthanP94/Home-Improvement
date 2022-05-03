const { Schema, model } = require('mongoose');

const projectSchema = require('./Project');

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

const Client = model('Client', clientSchema);

module.exports = Client;