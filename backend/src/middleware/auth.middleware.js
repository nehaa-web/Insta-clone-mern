const jwt = require("jsonwebtoken")

async function identifyUser ( req , res , next ){
    const token = req.cookies.token 

    if(!token){
        return res.status(401).json({
            message : "Token not provided , Unauthorized"
        })
    }

    let verify = null 

    try{
        verify = jwt.verify( token , process.env.JWT_SECRET_KEY)
    }catch(err){
           console.log(err.message);
        return res.status(401).json({
            message: "User not authorized"
        })
    }

    req.user = verify 

    next()
}

module.exports = identifyUser