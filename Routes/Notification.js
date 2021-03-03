const express = require('express')
const notification = require('../Model/Notification')
const router = express.Router()


router.post('/createNotification',(req,res,next)=>{
    notification.find({ Info:req.body.Info }).then(data=>{
        if(data.length>=1){
            return res.status(200).json({
                message: 'Notification exists',
                notificationData:data
            })
        }else{
            notification.create(req.body).then(data=>{
                return res.status(201).json({
                    message: 'Notification Created',
                    notificationData:data
                })
            })
        }
    })
})

router.get('/getAllNotification',(req,res,next)=>{
    notification.find({}).then(data=>{
            return res.status(201).json({
                message: 'Success',
                notificationData:data
            })
        })
})

module.exports = router