const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

const { buildSchema } = require('graphql')
const { createHandler } = require('graphql-http/lib/use/express')


const app = express()
const PORT = 4000

const connectDB = async() => {
    try{
        console.log(`Attempting to connect to DB`);
        const DB_CONNECTION = process.env.DB_CONNECTION
        mongoose.connect(DB_CONNECTION).then( () => {
            console.log(`MongoDB connected`)
        }).catch( (err) => {
            console.log(`Error while connecting to MongoDB : ${JSON.stringify(err)}`)
        });
    }catch(error){
        console.log(`Unable to connect to DB : ${error.message}`);
        
    }
}
//Schema
const schema = buildSchema(`
        type Query {
            loginUser(username: String!, password: String!): User
            getAllEmployees: [Employee]
            getEmployeeById(_id: ID!) : Employee
            searchEmployee(
            designation: String
            department: String
            ) : [Employee]
        
        
        }

        type Mutation {
                signupUser(username: String!, password: String!, email: String!):User
                addEmployee(
                    first_name: String,
                    last_name: String,
                    email: String,
                    gender: String,
                    designation: String,
                    salary: Float,
                    date_of_joining: String,
                    department: String,
                ): User
                updateEmployee(
                    _id: ID!,
                    first_name: String,
                    last_name: String,
                    email: String,
                    gender: String,
                    designation: String,
                    salary: Float,
                    date_of_joining: String,
                    department: String
                    ) : User
                deleteEmployee(_id: ID!) : User
        
        
        
        }
        type User{
            id: ID
            username: String
            password: String
            email: String

    
        }
        type Employee {
            first_name: String
            last_name: String
            email: String
            gender: String
            designation: String
            salary: Float
            date_of_joining: String
            department: String
        }

    `)



const root = {
        
       loginUser : (username: String!, password: String!) => {

       },
        getAllEmployees: () => {

        },
        getEmployeeById: (_id: ID!)  =>{

        },
        searchEmployee : (designation: String, department: String) => {

        },
        signupUser : () => {

        },
        addEmployee : () => {

        },
        updateEmployee : () => {

        },
        deleteEmployee : () => {


        }


}


app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);



app.listen(PORT, () =>{
    connectDB()
    console.log("GraphQL Server started")
    console.log("http://localhost:4000/graphql")
})