const catchAsyncErrors=require('../middlewares/catchAsyncErrors')
const jwt=require('jsonwebtoken')
const User=require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
exports.isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new ErrorHandler('login first to access this Resource',401))
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    req.user=await User.findById(decoded.id);
    next();

})