const express=require('express')
const app=express();
const products=require('./routes/product') 
const auth=require('./routes/auth')
const errorMiddleWare=require('./middlewares/errors')    
const cookieParser=require('cookie-parser')
app.use(express.json());
app.use(cookieParser());
//import all routes
app.use('/api/v1',products);
app.use('/api/v1',auth)
//middleware to handle errors
app.use(errorMiddleWare);

module.exports=app;
