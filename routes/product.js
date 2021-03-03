const express = require('express');
const router = express.Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getProductById,createProduct } = require("../controllers/product");

//Params
router.param("id",getUserById);
router.param("productId",getProductById);

//Actual Routes

router.post("/create/:id",
            isSignedIn, 
            isAuthenticated, 
            isAdmin, 
            createProduct
        );


module.exports = router;