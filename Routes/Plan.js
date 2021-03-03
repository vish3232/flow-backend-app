const express = require('express')
const plan = require('../Model/Plan')
const router = express.Router()

const fs = require('fs')

router.post('/createPlan',(req,res,next)=>{
    console.log(req.body)
    plan.find({ name:req.body.name}).then(data=>{
        if(data.length>=1){
            return res.status(200).json({
                message: 'Plan exists',
                planData:data
            })
        }else{
            
            plan.create(req.body).then(data=>{
                res.redirect('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:3000/plan.html')
       
            })
        }
    })
})

router.get('/allPlan',(req,res,next)=>{
    plan.find({}).then(data=>{
       if(data.length>=0){
        return res.status(200).json({
            message: 'Success',
            planData:data
        })
       } else {
        return res.status(400).json({
            message: 'No Data Found',
            
        })
        
       }
    })
})

router.delete('/:id', (req, res, next) => {
    
    plan.deleteOne({ _id: req.params.id }).then(data => {
        return res.status(200).json({
            message: 'Deleted...',
        })
      
    })
})
router.put('/updatePlan/:id',function(req,res,next){
    plan.findOneAndUpdate({_id:req.params.id},{name: req.body.name, plan_price_per_month: req.body.plan_price_per_month, plan_price_per_year: req.body.plan_price_per_year}).then(function(data){
            
        return res.status(200).json({
            message: 'Updated',
            planData:data
            
            
        })
      
        
    }).catch(next)
})




module.exports = router