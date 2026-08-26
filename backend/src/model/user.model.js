const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    follower : String ,
    followee : String ,
    status : {
        type : String , 
        default : "pending" ,
        enum : {
            values : ["pending" , "accepted" , "rejected"],
            message : "Status should be either pending , accepted or rejected"
        }
    }
},
{ timestamps : true})

userSchema.index({ follower : 1 , followee : 1} , { unique : true})

const userModel = mongoose.model("follows" , userSchema)

module.exports = userModel