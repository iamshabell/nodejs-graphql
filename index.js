

const {ApolloServer, gql} = require('apollo-server');
const EmployeeService = require('./datasources/file.js');


const typeDefs = gql`
    type Query {
        employees (
        id: ID
        firstName: String,
        lastName: String,
        designation: String,
        department: String,
        nearestCity: String
        ): [Employee],
        findEmployeeById(id: ID): Employee
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



const dataSources = () => ({
    employeeService: new EmployeeService()
}); 


const resolvers = {
    Query: {
        employees: (parent,args,{dataSources},info) => {
            return dataSources.employeeService.getEmployees(args);
        },
        findEmployeeById: (parent, {id},{dataSources},info) => {
            return dataSources.employeeService.getEmployeesById(id)[0];
        }
    }
}


const gqlServer = new ApolloServer({typeDefs, resolvers,dataSources});

gqlServer.listen({port: process.env.PORT || 4000})
.then(({url}) => console.log(`graphQL server started on ${url}`))