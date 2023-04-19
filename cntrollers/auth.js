var passport = require('passport');
const User = require("../models/users")
const passportJwt = require("passport-jwt");
// const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");


function passportConfig() {
    passport.use(User.userModel.createStrategy());
    passport.serializeUser(User.userModel.serializeUser());
    passport.deserializeUser(User.userModel.deserializeUser());
    jwtConfig();
}

async function loginUser(req,res) {
    console.log(`request: ${JSON.stringify(req.body)}`);
    const{username,password} = req.body;
    const localAuth = User.userModel.authenticate();
    localAuth(username,password,(err,result) => {
        if(err){res.status(400).send(err);}
        if(result){
            console.log(`login success`);
            console.log(result);
            const token = jwt.sign({auth_token:result._id},process.env.JWT_SEC);
            const tokenOption = {
                httpOnly: true,
                maxAge: 60 * 60
            };
            const {_id,dcId,email,username,serverList,...otherDetails} = result;
            res.cookie("jwt",token,tokenOption);
            res.status(200).json({user:{_id,email,username,serverList,dcId}})
        } 
        else { res.status(400).json({message:"invalid username or password"})}
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
          res.status(200).send(`${username} registered`)
    })
}

async function getUserByEmail(email) {
    User.userModel.findOne({email:email});
}


function jwtConfig(){
    const option = {};
    option.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
    option.secretOrKey = process.env.JWT_SEC;
    // option.ignoreExpiration = true;

    passport.use(new passportJwt.Strategy(option,(payload,done)=> {
        User.userModel.findById({_id:payload._id},(err, user)=> {
            if (err) {
                res.send("wrong with finding users");
                return done(err, false);
            }
            if (user) {
                console.log(`jwt authentcated: ${user}`);
                res.send("success authenticated")
                return done(null, user);
            } else {
                res.send("not verified")
                return done(null, false)
            }
        })  
    }))
}

async function checkAuth(req,res) {
    // const {id } = req.username;
    const verify = passport.authenticate('jwt',{session:false},()=> {
        res.status(200).send("auth success");
    });
 
}

async function logoutUser(req,res) {
    res.clearCookie("jwt");
    res.json({message:"logout success"});
}





module.exports = {passportConfig,loginUser,signupUser,getUserByEmail,checkAuth,logoutUser}