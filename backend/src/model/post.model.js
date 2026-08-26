const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    caption:{
        type : String ,
        default : ""
    },
    postImg : {
        type : String ,
        required : [true , "postImg is required"]
    },
    users:{
        type : String ,
        ref: "user" ,
        required : [true , "User is required"]
    }
})

const postModel = mongoose.model("post" , postSchema) 

module.exports = postModel