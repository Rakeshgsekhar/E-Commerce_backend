const _ = require("lodash");
const Product = require("../models/product");
const formidable = require("formidable"); 
const fs = require("fs");
require('dotenv').config();

/**Middleware */
exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((error,product)=>{
        if(error || !product){
            return res.status(400).json({
                error:{
                    value: "EMPTY_LIST",
                    error: "Cannot find the product with given ID"
                }
            })
        }
        // req.status(200).json({
        //     ...product
        // });
        req.product = product;
        next();
    });
}

exports.createProduct = (req, res)=>{
    //
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    // const {error, fields, files} = form;

    form.parse(req,(err, fields, file)=>{
        if(err){
            return res.status(400).json({
                error:{
                    value: "FILE_036",
                    error: "cannot load image"
                }
            })
        }

        //TODO restriction on fields
        let product = new Product(fields);


        //file handling
        if(file.image){
            if(file.image.size > process.env.file_max_size){
                return res.status(400).json({
                    error:{
                        value:"FILE_SIZE",
                        error:"File size too large to handle"
                    }
                })
            }
            product.image.data = fs.readFileSync(file.image.path);
            product.image.contenType = file.image.contenType;
        }

        //Save to DB
        product.save((error,item)=>{
            if(error){
                res.status(400).json({
                    error:{
                        value:"DB_ERR",
                        error: "Cannot save the product to db"
                    }
                })
            }
            res.status(200).json({...item});
        })


    })
}
