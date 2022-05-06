const { AuthenticationError } = require("apollo-server-express");
const { Client, Project, Employee, Manager } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.manager) {
        const managerData = await Manager.findOne({
          _id: context.manager.id,
        }).select("-__v -password");
        return managerData;
      }

      throw new AuthenticationError("Not logged in");
    },
    projects: async () => {
      return Project.find();
    },
    project: async (parent, { id }) => {
      console.log("I made it")
      return Project.findOne({_id: id}).populate("assignedEmployees");
    },
    employees: async () => {
      return Employee.find();
    },
    employee: async (parent, { id }) => {
      return Employee.findOne({_id: id}).populate("projects");
    },
    clients: async () => {
      return Client.find();
    },
    client: async (parent, { id }) => {
      return Client.findOne({_id: id});
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      console.log("Here I am");
      const manager = await Manager.findOne({ email });

      if (!manager) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await manager.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(manager);
      return { token, manager };
    },
    addProject: async (
      parent,
      { estimatedWorkTime, price, scopeOfWork, assignedEmployees, client }
    ) => {
      try {
        const project = await Project.create(
          { estimatedWorkTime, price, scopeOfWork, assignedEmployees, client },
        );
        const newProject = await Project.findOne({_id: project._id}).populate("assignedEmployees")  
        console.log(newProject)
        if (!project) {
          throw new AuthenticationError("Project not found");
        }
        return newProject;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError(err);
      }
    },
    addEmployee: async (
      parent,
      { firstName, lastName, expertise, email, phoneNumber }
    ) => {
      try {
        const employee = await Employee.create({
          firstName,
          lastName,
          expertise,
          email,
          phoneNumber,
        });

        if (!employee) {
          throw new AuthenticationError("Employee not found");
        }

        return employee;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError(err);
      }
    },
    addClient: async (
      parent,
      { firstName, lastName, homeAddress, email, phoneNumber }
    ) => {
      try {
        const client = await Client.create({
          firstName,
          lastName,
          homeAddress,
          email,
          phoneNumber,
        });

        if (!client) {
          throw new AuthenticationError("Client not found");
        }

        return client;
      } catch (err) {
        console.log(err);
        throw new AuthenticationError(err);
      }
    },
  },
};

module.exports = resolvers;
