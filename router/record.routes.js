const express = require("express");
const { getRecord } = require("../cntrollers/record");


const router = express.Router()

router.get("/", async (req,res) => {
    const {username}  = req.body;
    const record = await getRecord(username) ;
    res.send(record);
})

router.post("/", (res,req) => {

})

router.patch("/",(res,req) => {
    const {id,updateRecord} = req.body;

})

router.delete("/",(res,req) => {

})

module.exports = router;