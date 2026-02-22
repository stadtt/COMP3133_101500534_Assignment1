const UserModel = require("../model/Users")
const EmployeeModel = require("../model/Employee")

const rootResolver = {
        
       loginUser : async (args) => {

        try {
            const user = await UserModel.findOne({ username: args.username }).select('+password');
            if (!user) return null;
           
            if(user.password == args.password){
                return user
             }
             
             return null;

        }catch(error){
                console.log(`Error logging in : ${error.message}`)
            return null

        }
       },
        getAllEmployees: async () => {

        try{
            const Employees = await EmployeeModel.find()
            return Employees
        }catch(error){
            console.log(`Error while fetching Employees : ${error.message}`)
            return []
        }


        },
        getEmployeeById: async (args)  => {
             try{
                const Employee = await EmployeeModel.findOne({_id: args._id})
                return Employee
            }  catch(error){
                console.log(`Error while fetching Employee : ${error.message}`)
            return null
        }

        },
        searchEmployee: async (_, args) => {
        try {
            const { designation, department } = args;

            const Employee = await EmployeeModel.findOne({
            $or: [
                ...(designation ? [{ designation }] : []),
                ...(department ? [{ department }] : [])
            ]
            });

            return Employee;
        } catch (error) {
            console.log(`Error while fetching Employee: ${error.message}`);
            return null;
            }
        }


        ,
        signupUser : async (args) => {
            try{
            const newUser = await new UserModel({
                
                username: args.username,
                password: args.password,
                email: args.email
            })
            const savedUser = await newUser.save()
            return savedUser
        }catch(error){
            console.log(`Error while creating user : ${error.message}`)
            return null
        }

        },
        addEmployee : async (args) => {
            try{
                const newEmployee = await new EmployeeModel({
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    gender: args.gender,
                    designation: args.designation,
                    salary: args.salary,
                    date_of_joining: args.date_of_joining,
                    department: args.department,
                    employee_photo: args.employee_photo

                })
                const savedEmployee = await newEmployee.save()
                return savedEmployee

            }catch(error){
                     console.log(`Error while creating employee : ${error.message}`)
            return null
            }

        },
        updateEmployee : async(args) => {

              try{
                const UpdateEmployee = await EmployeeModel.findOneAndUpdate(
                {_id: args._id},
                {
                    $set: {
                    first_name: args.first_name,
                    last_name: args.last_name,
                    email: args.email,
                    gender: args.gender,
                    designation: args.designation,
                    salary: args.salary,
                    date_of_joining: args.date_of_joining,
                    department: args.department,
                    employee_photo: args.employee_photo
                    }

                },
                {new: true}
            )
            return UpdateEmployee
            }catch(error){
                     console.log(`Error while Updating Employee : ${error.message}`)
            return null
            }

        },
        deleteEmployee : async (args) => {
        try{
            const deletedEmployee = await EmployeeModel.findByIdAndDelete(args._id)
            return deletedEmployee
        }catch(error){
            console.log(`Error while deleting Employee : ${error.message}`)
            return null
        }


        }

}

module.exports = rootResolver