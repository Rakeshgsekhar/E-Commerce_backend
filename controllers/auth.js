const User = require('../models/user')

const {check,validationResult} =require('express-validator');


exports.signedOut = (req,res)=>{
    
    
    
}

exports.signUp = (req,res)=>{
    console.log("sigining up start REQ BODY => "+req.body);
    const user = new User(req.body);
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err: "User Creationg failed"
            });
        }else{
            res.json({
                name: user.name,
                email:user.email,
                id : user._id
        })
        }
    })
}