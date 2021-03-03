const express = require('express')
const accessToken = require('../Model/AccessToken')
const router = express.Router()


router.post('/createAccessToken',(req,res,next)=>{
    accessToken.find({  accessToken:req.body.accessToken,user_id:req.body.user_id }).then(data=>{
        if(data.length>=1){
            return res.status(200).json({
                message: 'AccesToken exists',
                accessTokenData:data
            })
        }else{
            accessToken.create(req.body).then(data=>{
                return res.status(201).json({
                    message: 'AccesToken Created',
                    accessTokenData:data
                })
            })
        }
    })
})

router.get('/allAccessToken',(req,res,next)=>{
    accessToken.find({}).then(data=>{
        return res.status(200).json({
            message: 'Success',
            accessTokenData:data
        })
    })
})
module.exports = router