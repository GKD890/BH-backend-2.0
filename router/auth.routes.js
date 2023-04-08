var express = require("express");
const { loginUser, signupUser, checkAuth, logoutUser } = require("../cntrollers/auth");
const router = express.Router();


router.post("/login", loginUser)
router.post("/signup",signupUser)

router.get("/checkAuth", checkAuth);
router.post("/logout",logoutUser);


module.exports = router;