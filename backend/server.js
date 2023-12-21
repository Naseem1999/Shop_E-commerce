const app=require('./app')
const connectDataBase=require('./config/database')

const dotenv=require('dotenv')
//Handle uncaught errors

process.on('uncaughtException',(err)=>{
    console.log(`ERROR : ${err.stack}`);
    console.log('Shutting down the server due to uncaught exception');
    server.close(()=>{
        process.exit(1)
    })
})
dotenv.config({path:'backend/config/config.env'})

connectDataBase();



const server=app.listen(process.env.PORT,()=>{
    console.log(`server is started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})    

// handle unhandledrejection
process.on('unhandledRejection',(err)=>{
    console.log(`ERROR : ${err.message}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(()=>{
        process.exit(1)
    })
})