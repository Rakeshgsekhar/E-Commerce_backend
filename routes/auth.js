var express = require('express');
var router = express.Router();

/**  validation at router, for valitating input request body */
const {check} = require("express-validator");


const { signedOut, signUp, signIn,isSignedIn } = require('../controllers/auth');

router.get("/signout",signedOut);

router.post("/signup",[
check("name").isLength({min:3})
.withMessage("name should be more than 3 char"),
check("email").isEmail().withMessage("Please provide a valid email id"),
check("password")
.isLength({min:5})
.withMessage('must be at least 5 char long')
.matches(/\d/)
.withMessage('must contain a Number')],
signUp);

router.post("/signin",[
check("email").isEmail().withMessage("Please provide an email id"),
check("password")
.isLength({min:5})
.withMessage('password Requried')
],
signIn);

router.get("/test", isSignedIn, (req,res) => {
   res.json(req.auth);
})

module.exports = router;