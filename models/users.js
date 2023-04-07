var mongoose = require("mongoose");
var passportLocalMongoose =  require("passport-local-mongoose");

const serverSchema = new mongoose.Schema({
    name:String,
    id:Number,
})

const serverModel = mongoose.model("Server",serverSchema);
const userSchema = {
    name:{
        type:String,
        require:true,
    },
    dcId: {type:Number,default:000000},
    email: {
        type:String,
        required:true,
        unique:true
    },
    activate:{type:Boolean,default:false},
    serverList:{type:[serverModel.schema]}
}

const User = new mongoose.Schema(userSchema);
User.plugin(passportLocalMongoose)

// module.exports = User
module.exports ={ 
    userModel: mongoose.model("User",User),
    userSchema: User
}