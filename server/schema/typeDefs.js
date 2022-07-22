const { gql } = require("apollo-server-express")

module.exports = gql`

    type User: {
        
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {

    }

    type Mutation {

    }
`