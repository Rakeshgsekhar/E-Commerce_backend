const express = require("express");
const router = express.Router(); 

const { getUserById, getUser, getAllUsers, updateUser } = require("../controllers/user");
const { isAuthenticated, isSignedIn, isAdmin } = require("../controllers/auth");


router.param("id",getUserById);
router.get("/userid/:id", isSignedIn, isAuthenticated, getUser);
router.get("/users", getAllUsers);
router.post("/update/:id",isSignedIn, isAuthenticated, updateUser);

module.exports = router;