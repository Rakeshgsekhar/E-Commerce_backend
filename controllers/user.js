const User = require("../models/user");

exports.getUserById = (req, res, next, id) =>{
    User.findById(id).exec((error,user)=>{
        if(error || !user){
            return res.status(400).json({
                error:{
                    error:"USR_NOT_FOUND",
                    value:"No user was found"
                }
            })
        }
        req.profile = user;
        next();
    });

}

exports.getUser = (req,res)=>{
    //TODO password
    req.profile.salt = undefined;
    req.profile.usr_passcod = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

exports.getAllUsers = (req,res)=>{
    User.find().exec((error,users)=>{
        if(error || !users){
             return res.status(400).json({
                error:{
                    error:"USR_EMPTY",
                    value:"No users was found"
                }
            })
        }
        users.forEach(user=>{
            user.salt = undefined;
            user.usr_passcod = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
        })
        return res.status(200).json({
            ...users
        })
    })
}

exports.updateUser =(req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set : req.body},
        {new:true, useFindAndModify:false},
        (error,user)=>{
            if(error || !user){
                return res.status(400).json({
                    error:{
                        error:"UPDATE_FORBID",
                        value:"You are not authorized to update"
                    }
                })
            }
            user.salt = undefined;
            user.usr_passcod = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json({
                ...user._doc
            })

        }
    )
}