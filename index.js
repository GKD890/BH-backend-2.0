var express = require("express");
var dotenv = require("dotenv")
var mongoose = require("mongoose");
var passport = require("passport");
const authRouter = require("./router/auth.routes");
const recordRouter = require("./router/record.routes");
const cookieParser = require("cookie-parser");
var cors = require("cors");

var session = require("express-session");
const { passportConfig } = require("./cntrollers/auth");
/* -------------------------------------------------------------------------- */
/*                                 Env Config                                 */
/* -------------------------------------------------------------------------- */

dotenv.config();
const defaultDB = "BhManagement";
const mongoUrl = process.env.DB_CONNECT_URL + defaultDB + process.env.DB_CONNECT_OPTION;
const PORT = process.env.PORT || 3000;


/* -------------------------------------------------------------------------- */
/*                               Express Config                               */
/* -------------------------------------------------------------------------- */
const app = express()
app.use(express.urlencoded({extended: false}) );

function initExpress() {
    app.get("/",(res,req) => {
        res.send("scucess")
    })
    app.use(session({
      secret: "secret1.",
      resave: false,
      saveUninitialized: false
    }));
    app.use(cors());
    app.use(passport.initialize());
    app.use(passport.session());    
    app.use(cookieParser());
    passportConfig();

    /* --------------------------------- Router --------------------------------- */
    app.use("/auth",authRouter);
    app.use("/record",recordRouter)
}


/* -------------------------------------------------------------------------- */
/*                             Connect to MongoDB                             */
/* -------------------------------------------------------------------------- */
const connectDB = async () => {
  try {
    const conn = mongoose.connect(mongoUrl,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`MongoURL: ${mongoUrl}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
 

/* -------------------------------------------------------------------------- */
/*                                    Main                                    */
/* -------------------------------------------------------------------------- */
connectDB().then((db) => {
    app.listen(PORT, async () => {
        console.log(`Connected to DB at ${PORT}`);
        initExpress();

        
    })
})