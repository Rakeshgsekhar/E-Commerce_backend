require('dotenv').config();
const User = require('../models/user')

// Validating the request with custum validator
const {validationResult} =require('express-validator');
const expressJwt = require("express-jwt");

// tokenise the use while signing in
const jwt = require("jsonwebtoken");

exports.signedOut = (req,res)=>{
}

exports.signIn = (req,res) =>{
    const errors = validationResult(req);
    const { email, password } = req.body;
    if(!errors.isEmpty()){
         return res.status(401).json({ errors:{
             value:errors.array()[0].value,
             error:errors.array()[0].msg,
             param:errors.array()[0].param,
             location:errors.array()[0].location
         }  });
    }
    User.findOne({email},(error,user)=>{
        if(error){
            return res.status(400).json({
                errors:{
                    value:"User not found",
                    error:"Email does not exist",
                    param:"user",
                    locaion:""
                }
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                errors:{
                    value:"Username/Password",
                    error: "Username and Password does not match",
                    param:"user/pass",
                    locaion:""
                }
                
            })
        }
        const privateKey = process.env.key;
        const token = jwt.sign({
            _id:user._id,
        },privateKey);
        res.cookie("token",token,{expire:new Date() + 999});

        const { _id, name, email, role } = user;
        return res.status(200).json({
            token,
            user:{
                _id,
                name,
                email,
                role
            }
        });
    })
}

exports.signUp = (req,res)=>{
    console.log("sigining up start REQ BODY => "+req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(422).json({ errors: errors.array()[0] });
    }
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