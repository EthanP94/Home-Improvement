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
    scope_of_work: String!
    est_work_time: Date!
    est_price: Integer!
    employee: [Employee]
  }

  type Auth {
    token: ID!
    client: Client
  }

  type Query {
    clients: [Client]
    clent(first_name: String!): Client
    employee(first_name: String!): [Employee]
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
      scope_of_work: String!
      est_work_time: Date!
      est_price: Integer!
    ): Project
    removeEmployee(employeeId: ID!): Employee
    removeProject(employeeId: ID!, projectId: ID!): Employee
  }
`;

module.exports = typeDefs;
