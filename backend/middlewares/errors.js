const ErrorHandler=require('../utils/errorHandler');

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    
    if(process.env.NODE_ENV==='DEVELOPMENT'){
        res.status(err.statusCode).json({
            success:false,
            error:err,
            errMessage:err.message,
            stack:err.stack
        })
    }
    if(process.env.NODE_ENV==='PRODUCTION'){
       let error={...err}
       error.message=err.message;
    //    wrong mongoose id or errors
    if(err.name==='CastError'){
        const message=`Resource not Found .invalid ${err.path}`
        error=new ErrorHandler(message,400)
    }
    //handling mongoose validation error
    if(err.name==='validationError'){
        const message=`Resource not Found .invalid : ${err.path}`
        error=new ErrorHandler(message,400)
    }
       res.status(error.statusCode).json({
        success:false,
        message:error.message || 'internal server error'
    })

    }
   
}