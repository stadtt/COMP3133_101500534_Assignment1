const mongoose = require("mongoose")

const empSchema = new mongoose.Schema({


   first_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [2, "First name must be at least 2 characters"],
        maxlength: [50, "First name cannot exceed 50 characters"],
    },
    
    last_name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        minlength: [2, "Last name must be at least 2 characters"],
        maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    

     email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other',

    },

    designation : {
        type: String,
        required:true,
        minlength: [2, "Designation must be at least 2 characters"],
        maxlength: [50, "Designation cannot exceed 50 characters"],
    },
    salary:{
        type:Number,
        required:true,
        min: [0, "Salary cannot be negative"],
        max: [10000000, "Salary cannot exceed 10 million"],
    },
    date_of_joining:{
        type: Date,
        default: Date.now,
        validate: {
            validator: function(value) {
                return value <= new Date();
            },
            message: "Date of joining cannot be in the future"
        }
    } ,
    department:{
        type: String,
        lowercase: true,
        trim: true,
        required:true,
        minlength: 2,
        maxlength: 50,
    },
    employee_photo: {
        type: String,
        default: null,
        trim: true,
        validate: {
            validator: function(value) {
                if (!value) return true; // allow null/empty
                return /^https?:\/\/.+/.test(value); // must start with http:// or https://
            },
            message: "Employee photo must be a valid URL starting with http:// or https://"
        }
    },
     created_at: {
        type: Date,
        default: Date.now
   },
     updated_at: {
        type: Date,
        default: Date.now
  },


})

module.exports = mongoose.model("Employee" , empSchema)