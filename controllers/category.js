
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
        res.status(200).json({
            category
        })
    })
}

exports.getCategory = (req, res)=>{
    //
    return res.json(req.category);
};

exports.getAllCategory = (req, res)=>{
    //
    Category.find().exec((error,items)=>{
        if(error | !items){
            return res.status(400).json({
                error:{
                    value: "EMPTY_LIST",
                    error:"No Categories found"
                }
            })
        }
        res.status(200).json(items);
    })
}

exports.updateCategory = (req, res)=>{
    const category = req.category;
    category.name = req.body.name;
    category.save((error,updatedCategory)=>{
        if(error || !updatedCategory){
            res.status(400).json({
                error:{
                    error:"Failed to update category",
                    value: "UPDATE_FAILED"
                }
            })
        }
        res.status(200).json(updatedCategory);
    })
}

exports.deleteCategory =(req, res)=>{
    const category = req.category;
    category.remove((error,deletedcategory)=>{
        if(error || !deletedcategory){
            return res.status(400).json({
                error:{
                    error:"Failed to delete category",
                    value:"DELETE_FAILED"
                }
            })
        }
        res.status(400).json({
            message:`${deletedCategory.name} was successfully deleted`,
            status: "SUCCESS"
        })
    })
}