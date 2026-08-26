const mongoose = require("mongoose")

const newSchema = new mongoose.Schema({
    username:{
        type : String,
        required : [true ,"Username is required"],
          unique : [true ,"Username is unique"]
    },
    email: {
        type: String ,
        required : [true , "Email is required"],
        unique: [true , "Email is unique"]
    },
    password :{
        type: String ,
        required : [true , "Password is required"],
        select : false
    },
    bio : String ,
    profileImg : {
        type : String ,
        default : "https://ik.imagekit.io/7ii02yeju/profile.jpg"
    },
})

const authModel = new mongoose.model("user" , newSchema)

module.exports = authModel