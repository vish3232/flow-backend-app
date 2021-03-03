const express = require('express')
const user = require('../Model/User')
const jwt = require('jsonwebtoken')
const router = express.Router()
const plan=require('../Model/Plan')
const trail=require('../Model/Trial')
const multer = require('multer')


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageUploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//declaring the multer
let upload = multer({ storage: storage }).single('profile')

router.post('/signup', (req, res, next) => {
    console.log(req.body)
    user.find({ "deviceId": req.body.deviceId }).then(data => {
        if (data.length >= 1) {
            plan.find({_id:req.body.planId}).then(data1=>{
                console.log(data1)
            return res.status(200).json({
                message: 'User exists',
                userData:data,
                planName:data1.name
                  
            })
        })
        } else {
            user.create(req.body).then(data => {
                plan.find({_id:req.body.planId}).then(data1=>{
                    console.log(data1)
                    const token = jwt.sign({
                        id: data._id,
                        deviceId: data.deviceId
                    }, "secret",
                        {
                            expiresIn: "90 days"
                        })
                    return res.status(201).json({
                        message: 'User Created',
                        token: token,
                        userData:data,
                        planName:data1.name
                    })
                })
               
            })
        }
    })
})

router.post('/signin', (req, res, next) => {
    console.log(req.body)
    user.findOne({ email: req.body.email, password: req.body.password }).then(data => {
        if (data === null) {
            return res.status(401).json({
                message: 'Auth Failed'
            })
        } else {
            console.log(data.planId)
            plan.findById({_id:data.planId}).then(data1=>{
                if (data1 === null) {
                    return res.status(401).json({
                        message: 'Auth Failed'
                    })
                }else{
                    const token = jwt.sign({
                        id: data._id,
                        deviceId: data.deviceId
                    }, "secret",
                        {
                            expiresIn: "90 days"
                        })
                    return res.status(200).json({
                        message: 'Auth Sucess',
                        token: token,
                        userData:data,
                        plan_name:data1.name
                    })
                }
            })

          
        }
    })
})

router.post('/ForgotPassword',(req,res,next)=>{
    if(req.body.email!=null && req.body.password!=null){

    user.findOne({email:req.body.email}).then(data=>{
        if(data!==null){
            user.update({email: req.body.email}, {
                
                password: req.body.password
            }, function(err, affected, resp) {
                return res.status(200).json({
                    message: 'Password Changed...'
                })
            })
        }else{
            return res.status(201).json({
                message: 'Email id does not exists...'
            })
         
        }
        
    
    })
}else{
    return res.status(401).json({
        message: 'Please username and password...'
    })
}
})

router.post('/getUserDetails',(req,res,next)=>{
    console.log(req.body.id)
    user.find({_id:req.body.id}).then(userdata=>{
        console.log(userdata)
        if(userdata!==null && userdata.length!=0){
            console.log(true)
    trail.find({userId:req.body.id}).then(subcriptiondata=>{
        console.log(subcriptiondata)
        if(subcriptiondata!==null && subcriptiondata.length!=0){
        return res.status(201).json({
            message: 'success',
            userData:userdata,
            subcriptiondata:subcriptiondata
        })
    }else{
        return res.status(400).json({
            message:"no data found"
        })
       
    }
    })
    }
    else{
        return res.status(400).json({
            message:"no data found"
        })
       
    }
     
    })
})

router.put('/updateUserSubcription/:id',function(req,res,next){
    user.findOneAndUpdate({_id:req.params.id},req.body).then(function(data){
            
        return res.status(400).json({
            message: 'Updated',
            UserData:data
            
            
        })
      
        
    }).catch(next)
})

router.put('/updateProfile/:email',upload,function(req,res,next){
    console.log(req.params.email)
    const file = req.file
    console.log(req.file)
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
  
    user.findOneAndUpdate({email:req.params.email},{fullname:req.body.fullname,mobile:req.body.mobile,email:req.body.email,destination: file.destination, filename: file.filename, download: file.path}).then(function(data){
            
        return res.status(200).json({
            message: 'Updated',
            profileData:data
        })
      
        
    }).catch(next)
})

router.get('/allAppUser',(req,res,next)=>{
    user.find({}).then(data=>{
        
                    return res.status(200).json({
                        message: 'Success',
                        UserData:data,
                        
                        
                    })
        
    })
})


router.get('/allUser',(req,res,next)=>{
    user.find({}).then(data=>{
        
        for(var i=0;i<data.length;i++){
            var id=data[i]._id
            trail.find({userId:id}).then(subcriptiondata=>{
                console.log(id)
                user.find({_id:id}).then(data1=>{
                    return res.status(200).json({
                        message: 'Success',
                        UserData:data1,
                        subcriptiondata:subcriptiondata
                        
                        
                    })
                  
                })
            })
        }
    })
})

router.post('/getAllFreeUser',(req,res,next)=>{
    console.log(req.body.planId)
    user.find({planId:req.body.planId}).then((data)=>{
        return res.status(200).json({
            message: 'Success',
            cnt:data.length
        })
      })
   
})

router.post('/getAllPremiumUser',(req,res,next)=>{
    user.find({planId:req.body.planId}).then((data)=>{
        return res.status(200).json({
            message: 'Success',
            cnt:data.length
        })
      })
   
})

router.post('/getProfileDetails',(req,res,next)=>{
    console.log(req.body)
    user.find({email:req.body.email}).then(data=>{
        plan.find({_id:data[0].planId}).then(subcriptiondata=>{
        return res.status(200).json({
            message: 'Success',
            profileData:data,
            subcriptionData:subcriptiondata
        })
    })
        
    })
})








module.exports = router