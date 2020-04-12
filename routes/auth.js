var express = require('express');
var router = express.Router();


const {signedOut,signUp} = require('../controllers/auth');

router.get("/signout",signedOut);

router.post("/signup",signUp);

module.exports = router;