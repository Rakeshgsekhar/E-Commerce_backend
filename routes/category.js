const express = require('express');
const router = express.Router();

const {check} = require("express-validator");
const {
     getCategoryById, 
     createCategory, 
     getCategory, 
     getAllCategory, 
     updateCategory,
     deleteCategory
    } = require("../controllers/category");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");


//params
router.param("id",getUserById);
router.param("categoryId",getCategoryById);


//routes
router.post("/create/:id",
isSignedIn, 
isAuthenticated,
isAdmin,
createCategory);

router.get("/:categoryId",getCategory);

router.get("/categories/getall",getAllCategory);

router.put("/:categoryId/:id", 
isSignedIn, 
isAuthenticated, 
isAdmin, 
updateCategory);

router.delete("/:categoryId/:id", 
isSignedIn, 
isAuthenticated, 
isAdmin, 
deleteCategory);


module.exports = router;