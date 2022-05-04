const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Client {
    _id: ID!
    first_name: String!
    last_name: String!
    home_address: String!
    phone_number: String!
    email: String!
  }

  type Employee {
    employeeId: ID!
    first_name: String!
    last_name: String!
    expertise: String!
    email: String!
    phone_number: String!
    project: [Project]
  }

  type Project {
    projectId: ID!
    scopeOfWork: String!
    estimatedWorkTime: String!
    price: Int!
    employee: [Employee]
  }

  type Manager {
    managerId: ID!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    client: Client
  }

  type Query {
    clients: [Client]
    clent(first_name: String!): Client
    employees: [Employee]
    employee(employeeId: ID!): Employee
    me: Client
  }

  type Mutation {
    addClient(
      first_name: String!
      last_name: String!
      home_address: String!
      phone_number: String
      email: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addEmployee(
      first_name: String!
      last_name: String!
      expertise: String!
      email: String!
      phone_number: String!
    ): Employee
    addProject(
      scopeOfwork: String!
      estimatedWorkTime: String!
      est_price: Int!
    ): Project
    removeEmployee(employeeId: ID!): Employee
    removeProject(employeeId: ID!, projectId: ID!): Employee
  }
`;

module.exports = typeDefs;
