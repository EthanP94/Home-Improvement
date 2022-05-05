const { AuthenticationError } = require("apollo-server-express");
const { Client, Project, Employee, Manager } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.client) {
        const clientData = await Client.findOne({
          _id: context.client._id,
        }).select("-__v -password");
        return clientData;
      }

      throw new AuthenticationError("Not logged in");
    },
    projects: async () => {
      return Project.find()
    } 
  },

  Mutation: {
    addClient: async (parent, args) => {
      const client = await Client.create(args);
      const token = signToken(client);

      return { token, client };
    },
    login: async (parent, { email, password }) => {
      console.log("Here I am")
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
    // saveProject: async (parent, { bookData }, context) => {
    //   if (context.client) {
    //     const updatedClient = await Client.findByIdAndUpdate(
    //       { _id: context.client._id },
    //       { $push: { savedBooks: bookData } },
    //       { new: true }
    //     );

    //     return updatedClient;
    //   }

    //   throw new AuthenticationError("You need to be logged in!");
    // },
    // removeProject: async (parent, { bookId }, context) => {
    //   if (context.client) {
    //     const updatedClient = await Client.findOneAndUpdate(
    //       { _id: context.client._id },
    //       { $pull: { savedBooks: { bookId } } },
    //       { new: true }
    //     );

    //     return updatedClient;
    //   }

    //   throw new AuthenticationError("You need to be logged in!");
    // },
  },
};

module.exports = resolvers;
