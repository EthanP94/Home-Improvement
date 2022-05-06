import { gql } from '@apollo/client';

export const QUERY_ALLPROJECTS = gql`
    {
        projects {
            id
            scopeOfWork
        }
    }
`

export const QUERY_ONEPROJECT = gql`
    query project($projectId: ID!) {
  project(id: $projectId) {
    id
    scopeOfWork
    estimatedWorkTime
    price
    assignedEmployees {
      firstName
      lastName
    }
  }
}
`

export const QUERY_ALLEMPLOYEES = gql`
    {
        employees {
            id
            firstName
            lastName
            expertise
        }
    }
`

export const QUERY_ONEEMPLOYEE = gql`
    {
        employee(id: $employeeId) {
            lastName
            expertise
            email
            phoneNumber
            firstName
        }
    }
`

export const QUERY_ALLCLIENTS = gql`
    {
        clients {
            firstName
            lastName
        }
    }
`

export const QUERY_ONECLIENT = gql`
    {
        client(id: $clientId) {
            firstName
            lastName
            homeAddress
            phoneNumber
            email
        }
    }
`