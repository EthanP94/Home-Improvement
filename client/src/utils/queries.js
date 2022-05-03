import { gql } from '@apollo/client';

export const QUERY_ALLPROJECTS = gql`
    {
        project {
            _id
        }
    }
`

export const QUERY_ONEPROJECT = gql`
    {
        project {
            _id

        }
    }
`

export const QUERY_ALLEMPLOYEES = gql`
    {
        employee {
            _id
            firstName
            lastName
        }
    }
`

export const QUERY_ONEEMPLOYEE = gql`
    {
        employee {
            _id
        }
    }
`

export const QUERY_ALLCLIENTS = gql`
    {
        client {
            _id
            firstName
            lastName
        }
    }
`

export const QUERY_ONECLIENT = gql`
    {
        client {
            _id
            firstName
            lastName
            homeAddress
            phoneNumber
            email
        }
    }
`