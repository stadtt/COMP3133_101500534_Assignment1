const express = require('express')
const mongoose = require('mongoose')
require("dotenv").config()

const { buildSchema } = require('graphql')



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

app.listen(PORT, () =>{
    connectDB()
    console.log("GraphQL Server started")
    console.log("http://localhost:4000/graphql")
})