const express = require('express')
const router = express.Router()
var msg91 = require("msg91")("335082AK638Ol4r5f06bb43P1", "vishal", "1" );
var mobileNo = "917822004901";
router.get('/sendOtp',(req,res)=>{
    msg91.send(mobileNo, "your otp is 1234", function(err, response){
        console.log(err);
        console.log(response);
        res.send(response)
    });

})

module.exports=router