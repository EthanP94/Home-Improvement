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
            id
            firstName
            lastName
        }
        client
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
    query employee($employeeId: ID!) {
    employee(id: $employeeId) {
        firstName
        lastName
        expertise
        email
        phoneNumber
    }
}
`

export const QUERY_ALLCLIENTS = gql`
    {
        clients {
            id
            firstName
            lastName
        }
    }
`

export const QUERY_ONECLIENT = gql`
    query client($clientId: ID!) {
    client(id: $clientId) {
        firstName
        lastName
        homeAddress
        phoneNumber
        email
    }
}
`