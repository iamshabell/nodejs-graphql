

const {ApolloServer, gql} = require('apollo-server');


const typeDefs = gql`
    type Query {
        employees: [Employee]
    }
    type Employee {
        id: ID!
        firstName: String,
        lastName: String,
        designation: String,
        department: String,
        nearestCity: String
    }
`

const resolvers = {
    Query: {
        employees: () => {
            
        }
    }
}

const gqlServer = new ApolloServer({typeDefs});

gqlServer.listen({port: process.env.PORT || 4000})
.then(({url}) => console.log(`graphQL server started on ${url}`))