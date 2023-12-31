const mongoose=require('mongoose');

const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt =require('jsonwebtoken')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please Enter Your Name'],
        maxLength:[30,'your name cannot exceed 30 chracters']
    },
    email:{
        type:String,
        required:[true,'please enter your email'],
        unique:true,
        validate:[validator.isEmail,'please enter valid email address']
    },
    password:{
        type:String,
        required:[true,'please enter a password'],
        minlength:[6,'Your password must be longer than 6 chracters'],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true,

        },
        url:{
            type:String,
            required:true,
        },
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date

})

//Encrypting password
userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})
//password compare
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
//token
userSchema.methods.getJwtToken=function (){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES_TIME
  })
}
module.exports=mongoose.model('user',userSchema);
