const express = require('express')
const trail = require('../Model/Trial')
const router = express.Router()
const user =require('../Model/User')

router.post('/createTrail',(req,res,next)=>{
    trail.find({  userId:req.body.userId}).then(data=>{
        if(data.length>=1){
            return res.status(200).json({
                message: 'Trail exists',
                trailData:data
            })
        }else{
            trail.create(req.body).then(data=>{
                res.redirect('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:3000/Plan.html')
       
            })
        }
    })
})

router.get('/allTrail',(req,res,next)=>{
    trail.find({}).then(data=>{
        if(data.length>=0){
            return res.status(200).json({
                message: 'Success',
                trailData:data
            }) 
        }else{
            return res.status(400).json({
                message: 'No Data Found',
                
            })
            
        }
    })
})


router.put('/updateTrailPeroid/:id',function(req,res,next){
    console.log(req.params.id)
    trail.findOneAndUpdate({userId:req.params.id},{end_Date:req.body.end_Date}).then(function(data){
        return res.status(200).json({
            message: 'Updated',
            trailData:data
            
            
        })
      
        
    }).catch(next)
})


module.exports = router