const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/pococare",{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("Db Connected")
}).catch((err)=>{
    console.log(err)
})