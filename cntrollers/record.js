var mongoose = require("mongoose");
const recordList = require("../mock-data/recordList.json");
const Record = require("../models/record")



async function getRecord(username) {
    try{
        console.log(`username: ${username}`)
        const result = Record.Record.find({
            $or:[
                {borrower:username},
                {lender:username}
            ]
        }).exec();
        console.log(result);
        return result;``
    } catch(err) {console.log(err)}
} 



async function createRecord(record) {
    try {
        const rec = Record.Record.create(record)
        console.log(`created: \n ${record}`);
        return rec;
    }
    catch (err) {console.log(err)}
} 

async function migragateRecord() {

    try {
        for (rec of recordList){
            const result = await Record.Record.create(rec).then((res)=>{
                // if(err){console.log(err)}
                console.log(`callback: ${res}`)
            });
 
        }
        console.log(result);
        console.log('Migration successful!');
    } catch (err) {
        console.error(err);
    } finally {
        // session.endSession();
        console.log('fin')
    }

    mongoose.connection.close();
    
    
}



module.exports = {migragateRecord,getRecord,createRecord}


