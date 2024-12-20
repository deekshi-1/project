const { Error } = require("mongoose");

const  errorHandler = (err,req,res,next)=>{
    const statusCode = res.statusCode == 200?500:res.statusCode;
    res.json({
        message:err?.message,
        stack:err?.stack
    })
}


const notFound = (req,res,next)=>{
    const err = new Error(`Not found :${req.originalUrl}`);
    res.status(404);
    next(err)
}


module.exports={notFound,errorHandler}