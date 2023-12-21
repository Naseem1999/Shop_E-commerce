const mongoose=require('mongoose')

const connectDataBase=()=>{
    mongoose.connect(process.env.DB_LOCAL_URI ,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        
       
    }).then(con=>{
        console.log(`MongoDB Database connected with Host :${con.connection.host}`)
    })
}

module.exports=connectDataBase;