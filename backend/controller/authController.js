const User=require('../models/user');
const ErrorHandler=require('../utils/errorHandler');
const catchAsyncErrors=require('../middlewares/catchAsyncErrors')
const sendToken=require('../utils/jwtToken')

//register a user api/v1/register

exports.registerUser=catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}=req.body;

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'avatars/profile1_jq5fea',
            url:'https://res.cloudinary.com/dhyyjvson/image/upload/v1703055614/avatars/profile1_jq5fea.jpg'
        }
    })
     sendToken(user,200,res);
})
//login user /api/v1/login
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler('please enter email and password',400))
        
    }
    const user=await User.findOne({email}).select('+password')
    if(!user){
        return next(new ErrorHandler('please enter valid email and password'))
    }
    const isPasswordmatched=await user.comparePassword(password);
    if(!isPasswordmatched){
        return next(new ErrorHandler('please enter valid email and password'))
    }
    sendToken(user, 200, res)
})

exports.logout=catchAsyncErrors(async (req,res,next)=>{
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})