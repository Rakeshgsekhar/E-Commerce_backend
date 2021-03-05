const User = require("../models/user");
const Order = require("../models/order");

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

exports.getUserOrderList =(req,res)=>{
    Order.find({user:req.profile._id})
    .populate("ADMUSRMST","_id name")
    .exec((error,order)=>{
        if(error){
            return res.status(400).json({
                error:{
                    error:"No Order Found",
                    value: "NO_ORDER_FOUND"
                }
            })
        }
        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req, res, next)=>{
    let purchases = [];
    req.body.order.products
    .forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            castegory: product.castegory,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    } );

    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (error,purchase)=>{
            if(error || !purchases){
                return res.status(400).json({
                    error:{
                        error:"Unable to save purchase list",
                        value: "UPDATE_ERROR"
                    }
                })
            }
            next();
        }
    );
}