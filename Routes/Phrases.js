const express = require('express')
const phrases = require('../Model/Phrases')
const router = express.Router()
const fs = require('fs')


router.post('/createPhrases',(req,res,next)=>{
    phrases.find({ phrase:req.body.phrase}).then(data=>{
        if(data.length>=1){
            return res.status(200).json({
                message: 'Phrases exists',
                phrasesData:data
            })
        }else{
            phrases.create(req.body).then(data=>{
                res.redirect('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:3000/Phrases.html')
       
            })
        }
    })
})

router.get('/getPhrases',(req,res,next)=>{
    phrases.find({}).then(data=>{
        return res.status(201).json({
            message: 'success',
            phrasesData:data
        })
    })
})

router.delete('/:id', (req, res, next) => {
    
    phrases.deleteOne({ _id: req.params.id }).then(data => {
        return res.status(200).json({
            message: 'Deleted...',
        })
                  
    })
})

router.put('/updatePhrases/:id',function(req,res,next){
    phrases.findOneAndUpdate({_id:req.params.id},{phrase:req.body.phrase}).then(function(data){
            
        return res.status(400).json({
            message: 'Updated',
            phrasesData:data
        })
      
        
    }).catch(next)
})


module.exports = router