const {
    ApolloServer,
    gql
} = require ('apollo-server-express')
const express = require('express')

const typeDefs = gql`
type Query {
    plugins: [String]
}
`;

const plugins = [
    'http://localhost:9100/plugin-1.bundle.js',
    'http://localhost:9100/plugin-2.bundle.js'
]

const resolvers = {
    Query: {
        plugins: () => plugins
    }
}

const server = new ApolloServer (
    {
        typeDefs,
        resolvers
    }
)

const app = express ()
server.applyMiddleware (
    {
        app,
        path: '/graphql'
    }
)
app.listen (
    8080, 
    () => {
        console.log (`Apollo is listening at http://localhost:8080${server.graphqlPath}`)
    }
)
