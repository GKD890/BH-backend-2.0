var passport = require('passport');
const User = require("../models/users")


function passportConfig() {
    passport.use(User.userModel.createStrategy());
    passport.serializeUser(User.userModel.serializeUser());
    passport.deserializeUser(User.userModel.deserializeUser());
}

async function loginUser(req,res) {
    const{username,password} = req.body;
    const localAuth = User.userModel.authenticate();
    localAuth(username,password,(err,result) => {
        if(err){res.status(400).send(err); process.exit(1)}
        if(result){
            console.log(`login success`);
            console.log(result);
            return result;
        } 
        else { res.send()}
    });  
}

async function signupUser(req,res) {
    const {username,email,password,dcId} = req.body;
    User.userModel.register(new User.userModel({username:username,email:email,dcId:dcId}),password,(err) => {
        if (err) {
            console.log('error while user register!', err);
            return next(err);      
          }
          console.log(`${username} registered!`);
    })
}

async function getUserByEmail(email) {
    User.userModel.findOne({email:email});
}

async function checkAuth(userName) {
    User.userModel.findOne('')
}




module.exports = {passportConfig,loginUser,signupUser,getUserByEmail}