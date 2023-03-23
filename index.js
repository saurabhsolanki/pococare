const express = require('express')
const router=require('./Routes/user.route')

require("./DB/connection")
const app= express()



app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.get('/', (req,res)=> res.send('hello'))

app.listen(8080,()=> {console.log('server started at port 8080')})