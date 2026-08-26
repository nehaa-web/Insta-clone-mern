const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post: {
       type: mongoose.Schema.Types.ObjectId,
        ref : "post" ,
        required : [true , "postid is required for liking"]
    },
    user:{
        type: String ,
        required : [true , "Username is required for liking"]
    }
},{ timestamps : true })

likeSchema.index( { post : 1 , user : 1} , {unique : true} ) 

const likeModel = mongoose.model("likes" , likeSchema)

module.exports = likeModel