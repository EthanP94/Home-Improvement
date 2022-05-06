import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      manager {
        id
      }
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation Mutation($estimatedWorkTime: String!, $price: Int!, $scopeOfWork: String!, $assignedEmployees: [ID]) {
    addProject(estimatedWorkTime: $estimatedWorkTime, price: $price, scopeOfWork: $scopeOfWork, assignedEmployees: $assignedEmployees) {
      scopeOfWork
      estimatedWorkTime
      price
      assignedEmployees {
        firstName
        lastName
      }
      client
  }
}
`;

export const ADD_EMPLOYEE = gql`
   mutation addEmployee($firstName: String!, $lastName: String!, $expertise: String!, $email: String!, $phoneNumber: String!) {
    addEmployee(firstName: $firstName, lastName: $lastName, expertise: $expertise, email: $email, phoneNumber: $phoneNumber) {
        id
        firstName
        lastName
        expertise
        email
        phoneNumber
        projects {
          id
        }
    }
}
`;

export const ADD_CLIENT = gql`
    mutation addClient($firstName: String!, $lastName: String!, $homeAddress: String!, $email: String!, $phoneNumber: String) {
        addClient(firstName: $firstName, lastName: $lastName, homeAddress: $homeAddress, email: $email, phoneNumber: $phoneNumber) {
            id
            firstName
            lastName
            homeAddress
            phoneNumber
            email
    }
}
`;
