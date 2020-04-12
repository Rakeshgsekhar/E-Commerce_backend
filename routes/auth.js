var express = require('express');
var router = express.Router();

const {signedOut} = require('../controllers/auth');

router.get("/signout",signedOut);

router.post("/signup",(req,res)=>{

    res.send("user created");
});

module.exports = router;