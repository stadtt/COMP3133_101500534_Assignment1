
const { buildSchema } = require('graphql')

const schema = buildSchema(`
        type Query {
            loginUser(username: String!, password: String!): User
            getAllEmployees: [Employee]
            getEmployeeById(_id: ID!): Employee
            searchEmployee(
                designation: String
                department: String
            ): [Employee]
        }

        type Mutation {
            signupUser(username: String!, password: String!, email: String!): User
            addEmployee(
                first_name: String
                last_name: String
                email: String
                gender: String
                designation: String
                salary: Float
                date_of_joining: String
                department: String
                employee_photo: String
            ): Employee

            updateEmployee(
                _id: ID!
                first_name: String
                last_name: String
                email: String
                gender: String
                designation: String
                salary: Float
                date_of_joining: String
                department: String
                employee_photo: String
            ): Employee

            deleteEmployee(_id: ID!): Employee
        }

        type User {
            id: ID
            username: String
            password: String
            email: String
        }

        type Employee {
            _id: ID
            first_name: String
            last_name: String
            email: String
            gender: String
            designation: String
            salary: Float
            date_of_joining: String
            department: String
            employee_photo: String
        }
`)

module.exports =  schema