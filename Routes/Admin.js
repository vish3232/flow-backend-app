const express = require('express')
const admin = require('../Model/Admin')
const router = express.Router()


router.post('/createAdmin',(req,res,next)=>{
    admin.find({ userName:req.body.userName}).then(data=>{
        if(data.length>=1){
            return res.status(200).json({
                message: 'User exists',
                userData:data
            })
        }else{
            admin.create(req.body).then(data=>{
                return res.status(201).json({
                    message: 'User Created',
                    userData:data
                })
            })
        }
    })
})

router.post('/adminLogin',(req,res,next)=>{
    console.log(req.body)
    admin.findOne({ userName: req.body.userName, password: req.body.password }).then(data => {
        if (data === null) {
            return res.status(401).json({
                message: 'Auth Failed'
            })
        } else {
            return res.status(200).json({
                message: 'Auth Sucess',
                userData:data
            })
        }
    })
})

module.exports = router