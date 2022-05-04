const db = require('../config/connection');
const { Manager, Employee, Client, Project } = require('../models');

const managerData = require('./managerData.json');
const employeeData = require('./employeeData.json');
const clientData = require('./clientData.json');
const projectData = require('./projectData.json');


db.once('open', async () => {
  // Wipes Database Clean
  await Manager.deleteMany({});
  await Employee.deleteMany({});
  await Client.deleteMany({});
  await Project.deleteMany({});


  // bulk creates each model
  await Manager.insertMany(managerData);
  await Employee.insertMany(employeeData);
  await Client.insertMany(clientData);
  await Project.insertMany(projectData);

  console.log('Data seeded!');
  process.exit(0);
});
