const express = require('express')
const router = express.Router()
const payment=require('../Model/Payement')
const user=require('../Model/User')

router.get("/getinfo",(req,res,next)=>{
  res.send("hello")
})

router.put('/addpayment',(req,res,next)=>{
    console.log(req.body.deviceId)
    user.findOneAndUpdate({deviceId:req.body.deviceId},{planId:req.body.planId}).then(function(data){
            
      return res.status(200).json({
          message: 'Updated',
          subcategoryData:data
      })
    })

})

module.exports = router