import { gql } from "@apollo/client";

export const LOGIN_MANAGER = gql`
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
    mutation addProject() {
        addProject(){
            token
            project {
                _id
                employee {
                    firstName
                    lastName
                }
                client {
                    _id
                    firstName
                    lastName
                }
            }
        }
    }
`;

export const ADD_EMPLOYEE = gql`
    mutation addEmployee() {
        addEmployee(){
            token
            employee {
                _id
                firstName
                LastName
                project {
                    _id
                }
            }
        }
    }
`;

export const ADD_CLIENT = gql`
    mutation addClient() {
        addClient() {
            token 
            client {
                _id
                firstName
                lastName
                project {
                    _id
                }
            }
        }
    }
`;
