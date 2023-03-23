const userdb = require('../models/user.model')
const jwt = require('jsonwebtoken')

exports.isAuth = async(req,res,next) =>{
    // try {
        const token = req.headers.authorization;
        console.log(token,"isAuthToken")
        if(token){
            const verifytoken = jwt.verify(token, "SECRET1234");
        
        const rootUser = await userdb.findOne({_id:verifytoken._id});
        
        if(!rootUser) {throw new Error("user not found")}

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();
        }else{
            console.log("error")
        }
}