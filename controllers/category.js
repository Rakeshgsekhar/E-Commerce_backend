
const Category = require("../models/category");

exports.getCategoryById = ( req, res, next )=>{
    Category.findById(id).exec((error,category)=>{
        if(error || !category){
            res.status(400).json({
                error:{
                    value:"NOT_FOUND",
                    error:"Category not found"
                }
            });
        }
        req.category = category;
        next();
    });
};

exports.createCategory=(req, res)=>{
    const category = new Category(req.body);
    category.save((error,category)=>{
         if(error || !category){
            res.status(400).json({
                error:{
                    value:"CANNOT_SAVE",
                    error:"Cannot save Category"
                }
            });
        }
        res.staus(200).json({
            category
        })
    })
}