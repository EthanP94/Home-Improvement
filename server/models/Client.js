const { Schema, model } = require('mongoose');

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

const Client = model('Client', clientSchema);

module.exports = Client;