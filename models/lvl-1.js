import mongoose from "mongoose";

const lvl1Schema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        // You can use a regular expression or a library like `validator` to validate emails
        validate: {
          validator: function(value) {
            // Example of basic email validation using a regular expression
            return /\S+@\S+\.\S+/.test(value);
          },
          message: 'Invalid email address'
        }
      },
    password:String,
    fName : String,
    lName : String,
    phoneNo : Number,
    company : String
})

const L1_person = mongoose.model("L1_person",lvl1Schema)

export default L1_person 