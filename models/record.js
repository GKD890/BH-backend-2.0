var mongoose = require("mongoose");


const recordSchema = new mongoose.Schema({
    borrower:{type:String},
    lender: {type:String},
    value: {type:Number, default:0},
    trans_date: {type:Date,default:new Date().toISOString().replace('Z', '')},
    complete: {type:Boolean, default:false},
    description: {type:String, default:''},
});


const Record = mongoose.model("Record",recordSchema);

module.exports = {Record};