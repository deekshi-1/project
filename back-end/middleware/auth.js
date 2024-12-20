// VERIFY JWT TOKEN
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asycnhandler = require("express-async-handler");

const authMiddleware = asycnhandler(async (req, res, next) => {  
    if (req?.headers?.authorization?.startsWith("Bearer")) {
    let token =req?.headers?.authorization?.split(" ")[1];
    try{
        if(token){
            const decode = await jwt.verify(token,process.env.JWT_SECRET);
            const result = await User.findById(decode?.id)
            req.user = result;
            next();
        }
    }
    catch (err){
            throw new Error(err)
    }
  }
  else{
    throw new Error("Tokken missing in the header");
  }
});


module.exports = authMiddleware;