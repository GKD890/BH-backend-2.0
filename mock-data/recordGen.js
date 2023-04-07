var fs = require("fs")
const userRaw = require("./usersList.json");
var recordSchema  = require("../models/record")

userList = userRaw.userList;
const nameList = [];
// console.log(userRaw.userList);
userList.forEach(n =>{nameList.push(n.name)});

const generateRandomRecord = (description="") =>{
    const user1 = Math.floor((Math.random()*nameList.length));
    let user2 = Math.floor((Math.random()*nameList.length));
    while(user1 == user2) {
        user2 = Math.floor((Math.random()*nameList.length));
    }
    const value = Number((Math.random()*100.00).toFixed(2));
    return({
        borrower:nameList[user1],
        lender: nameList[user2],
        value: value,
        description: description,
    })
}

let recordList = [];
for(let i=0; i<35;i++){
    // console.log(re);
    recordList.push(generateRandomRecord())
}

fs.writeFile("mock-data/recordList.json",JSON.stringify(recordList,null,2),function done(err,result){
    if(err) {return(err)}
    console.log(result);
})
