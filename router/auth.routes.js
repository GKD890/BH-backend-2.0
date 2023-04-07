var express = require("express");
const { loginUser, signupUser } = require("../controllers/auth");
const router = express.Router();


router.post("/login", loginUser)
router.post("/signup",signupUser)

router.get("/checkAuth", async (req,res) => {

})


module.exports = router;