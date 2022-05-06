const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Client {
    id: ID!
    firstName: String!
    lastName: String!
    homeAddress: String!
    phoneNumber: String!
    email: String!
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    expertise: String!
    email: String!
    phoneNumber: String!
    project: [Project]
  }

  type Project {
    id: ID!
    scopeOfWork: String!
    estimatedWorkTime: String!
    price: Int!
    assignedEmployees: [Employee]
    client: Client
  }

  type Manager {
    id: ID!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    manager: Manager
  }

  type Query {
    clients: [Client]
    client(id: ID!): Client
    employees: [Employee]
    employee(id: ID!): Employee
    projects: [Project]
    project(id: ID!): Project
    me: Manager
  }

  type Mutation {
    addClient(
      firstName: String!
      lastName: String!
      homeAddress: String!
      phoneNumber: String
      email: String!
    ): Client
    login(email: String!, password: String!): Auth
    addEmployee(
      firstName: String!
      lastName: String!
      expertise: String!
      email: String!
      phoneNumber: String!
      project: [ID]
    ): Employee
    addProject(
      scopeOfWork: String!
      estimatedWorkTime: String!
      price: Int!
      assignedEmployees: [ID]
      client: ID
    ): Project
  }
`;

module.exports = typeDefs;
