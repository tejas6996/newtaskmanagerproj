const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
        // await mongoose.connect('mongodb://127.0.0.1:27017/tejasDB',
      //   {
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true
      //   }
      // );
    
    }catch(err){
        console.log(err)
    }
}
module.exports=connectDB