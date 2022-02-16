

const {ApolloServer, gql} = require('apollo-server');
const EmployeeService = require('./datasources/file.js');
const ProjectService = require('./datasources/project.js');


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
        findEmployeeById(id: ID): Employee,
        projects : [Project],
        findProjectById(id: ID): Project,
    }
    type Employee {
        id: ID! 
        firstName: String,
        lastName: String,
        designation: String,
        department: String,
        nearestCity: String
    }

    type Project {
        id: ID! 
        projectName: String
        startDate: String
        client: String
        employees: [Employee]
    }
`



const dataSources = () => ({
    employeeService: new EmployeeService(),
    projectService: new ProjectService()
}); 


const resolvers = {
    Query: {
        employees: (parent,args,{dataSources},info) => {
            return dataSources.employeeService.getEmployees(args);
        },
        findEmployeeById: (parent, {id},{dataSources},info) => {
            return dataSources.employeeService.getEmployeesById(id)[0];
        },
        projects: (parent,args, {dataSources}, info)=>{
            return dataSources.projectService.getProjects();
        },
        findProjectById: (parent,{id}, {dataSources}, info) => {
            return dataSources.projectService.getProjectsById(id);
        }
    }
}


const gqlServer = new ApolloServer({typeDefs, resolvers,dataSources});

gqlServer.listen({port: process.env.PORT || 4000})
.then(({url}) => console.log(`graphQL server started on ${url}`))