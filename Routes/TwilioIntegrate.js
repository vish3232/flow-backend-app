const express = require('express')
const router = express.Router()
const accountSid = 'AC4c90ce28ffca66349780e971c00d4bf8';
const authToken = '8c3a4b1a66d9cab0118803e592382d20';
const client = require('twilio')(accountSid, authToken);
const speakeasy=require('speakeasy')
var code;
router.post('/sendOtp',(req,res,next)=>{
     code = speakeasy.totp({key: 'abc123'});
     console.log(req.body)
    client.messages
      .create({
         body: 'Your otp is '+code,
         from: '+16413268909',
         to: req.body.mobileNo
       })
      .then(message => res.send(message.sid)).catch(err=>console.log(err));
})

router.post('/verifyOtp',(req,res,next)=>{
    const otp=req.body.totp;
    if(parseInt(otp)==code){
        res.send('verify successfully')
    }else{
        res.send('please enter valid otp')
    }
})
module.exports = router