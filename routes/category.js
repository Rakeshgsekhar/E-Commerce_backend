const express = require('express');
const router = express.Router();

const {check} = require("express-validator");
const { getCategoryById, createCategory } = require("../controllers/category");
const { isAuthenticated, isAdmin, isSignedIn } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");


//params
router.param("id",getUserById);
router.param("categoryid",getCategoryById);


//routes
router.post("/create/:id",
isSignedIn, 
isAuthenticated,
isAdmin,
createCategory);

module.exports = router;