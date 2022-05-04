import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      manager {
        _id
      }
    }
  }
`;

export const ADD_PROJECT = gql`
    mutation addProject($scopeOfWork: String!, $estimatedWorkTime: String!) {
        addProject(scopeOfWork: $scopeOfWork, estimatedWorkTime: $estimatedWorkTime){
            _id
            scopeOfWork
            estimatedWorkTime
            assignedEmployees {
                firstName
                lastName
            }
            client {
                firstName
                lastName
            }
        }
    }
`;

export const ADD_EMPLOYEE = gql`
    mutation addEmployee($firstName: String!, $lastName: String!, $expertise: String!, $email: String, $phoneNumber: String!) {
        addEmployee(firstName: $firstName, lastName: $lastName, expertise: $expertise, email: $email, phoneNumber: $phoneNumber){
            employee {
                _id
                firstName
                LastName
                expertise
                email
                phoneNumber
                setProjects {
                    _id
                }
            }
        }
    }
`;

export const ADD_CLIENT = gql`
    mutation addClient($firstName: String!, $lastName: String!, $email: String, $phoneNumber: String!) {
        addClient(firstName: $firstName, lastName: $lastName, email: $email, phoneNumber: $phoneNumber) {
            client {
                _id
                firstName
                lastName
                email
                phoneNumber
                setProjects {
                    _id
                }
            }
        }
    }
`;
