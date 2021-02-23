require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const corsParser = require('cors');


const authRoutes = require('./routes/auth'); 
//portfolioEcom

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(()=>{
    console.log("DB CONNECTED")
}).catch(()=>{
    console.log("Connectivity error")
})
/**Middleware */
app.use(bodyParser.json());
app.use(cookieParser());
app.use(corsParser());

//connection chaining

/**Routes */
app.use("/api/v1/auth",authRoutes);



const port = process.env.PORT || 8000;


app.listen(port,()=>{
    console.log(`app is running at ${port}`);
})