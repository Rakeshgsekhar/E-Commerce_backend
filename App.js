const mongoose = require("mongoose");
const express = require("express");

const app = express();
//portfolioEcom

mongoose.connect('mongodb://localhost:27017/portfolioEcom',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(()=>{
    console.log("DB CONNECTED")
}).catch(()=>{
    console.log("Connectivity error")
})

//connection chaining




const port = 8000;

app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})