const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const { title } = require('process')
const song = require('../Model/Audio')
const category_type = require('../Model/Category')
const subcategory_type = require('../Model/Sub_Category')
const title_type=require('../Model/Title')

//configuring the multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//declaring the multer
let upload = multer({ storage: storage }).array('audio', 100)


// saving the song in the database
router.post('/uploadfile', upload, (req, res, next) => {
    console.log(req.body)
    const file = req.files
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.setHeader('Content-Type', 'application/json');

    if (req.body.sub_category_id === "") {

        res.send('Some fields are missing failed to upload')

    } else {
        file.map(data => {
            song.create({  sub_category_id: req.body.value, destination: data.destination, filename: data.filename, download: data.path,audioStatus:req.body.group1 }).then(data1 => {
                res.redirect('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:3000/upload.html')
      
            })
        })
    }

})
let uploadSong = multer({ storage: storage }).single('music', 1)

router.put('/updateSong/:id',uploadSong,function(req,res,next){
    const file = req.file
    console.log(req.file)
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
  
    song.findOneAndUpdate({_id:req.params.id},{sub_category_id: req.body.value, destination: file.destination, filename: file.filename, download: file.path,audioStatus:req.body.group1}).then(function(data){
            
        return res.status(200).json({
            message: 'Updated',
            subcategoryData:data
        })
      
        
    }).catch(next)
})


router.get('/song/:id', (req, res, next) => {
    console.log(req.params.id)
    song.findById(req.params.id).then(data => {
        let filePath = './uploads/' + data.filename
        const stat = fs.statSync(filePath)
        const fileSize = stat.size
        const range = req.headers.range
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1
            const chunksize = (end - start) + 1
            const file = fs.createReadStream(filePath, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'audio/mpeg'
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(filePath).pipe(res)
        }
    }).catch(err => {
        console.log(err)
    })
})


router.get('/allSong',(req,res,next)=>{
    song.find({}).then(data=>{
        return res.status(200).json({
            message:"success",
            songs:data
        })
    })
})

router.delete('/deleteSong/:id',(req,res,next)=>{
    song.deleteOne({_id:req.params.id}).then(data=>{
        return res.status(200).json({
            message: 'Deleted...',
        })
      
    })
})

router.delete('/deleteTitle/:id',(req,res,next)=>{
    title_type.deleteOne({_id:req.params.id}).then(data=>{
        return res.status(200).json({
            message: 'Deleted...',
        })
      
    })
})

router.delete('/deleteCategory/:id',(req,res,next)=>{
    category_type.deleteOne({_id:req.params.id}).then(data=>{
        return res.status(200).json({
            message: 'Deleted...',
        })
      
    })
})

router.delete('/deleteSubCategory/:id',(req,res,next)=>{
    subcategory_type.deleteOne({_id:req.params.id}).then(data=>{
        return res.status(200).json({
            message: 'Deleted...',
        })
      
    })
})
router.get('/allSongs',(req,res,next)=>{
    song.find({}).then(data=>{
        return res.status(201).json({
            message: 'success',
            songData:data
        })
    })
})

router.post('/all', (req, res, next) => {
    console.log(req.body.sub_category_id)
    
    song.find({sub_category_id:req.body.sub_category_id,audioStatus:req.body.audioStatus}).then(data => {
        return res.status(201).json({
            message: 'success',
            songData:data
        })
    })
})

router.get('/allFreeSong', (req, res, next) => {
    console.log(req.body.audioStatus)
    song.find({audioStatus:req.body.audioStatus}).then(data => {
        return res.status(201).json({
            message: 'success',
            songData:data
        })
    })
})

let storageImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageUploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


let uploadImage=multer({ storage: storageImage }).single('image',1)
router.post('/addCategory', uploadImage,(req, res, next) => {
    console.log(req.body)
    const file = req.file
    console.log(req.file)
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    if(req.body.category_name === "" || req.body.category_decscription === "" || req.body.category_image_url==="" || req.body.color==="")
    {
        res.send('Some fields are missing failed to upload')

    }else{
        category_type.create({ title_id:req.body.value,category_name: req.body.category_name, category_decscription: req.body.category_decscription, destination: file.destination, filename: file.filename, category_image_url: file.path,colour:null }).then(data => {
            res.redirect('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:3000/Category.html')
        })
    }
})

router.put('/updateCategory/:id',uploadImage,function(req,res,next){
    console.log(req.body)
    const file = req.file
    console.log(req.file)
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
  
    category_type.findOneAndUpdate({_id:req.params.id},{title_id:req.body.value,category_name:req.body.category_name,category_decscription:req.body.category_description,destination:file.destination, filename: file.filename, category_image_url: file.path,colour:null,category_decscription:req.body.category_description}).then(function(data){
            
        return res.status(200).json({
            message: 'Updated',
            subcategoryData:data
        })
      
        
    }).catch(next)
})


router.post('/addTitle', (req, res, next) => {
    if (req.body.name === '') {
        res.send('Faild To Add')
    } else {
        title_type.create(req.body).then(data => {
            res.redirect('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:3000/Title.html')
        })
    }
})

router.get('/title/all', (req, res, next) => {
    title_type.find().then(data => {
        return res.status(201).json({
            message: 'success',
            titleData:data
        })
    
    })
})

router.put('/updateTitle/:id',function(req,res,next){
    console.log(req.params.id)
    title_type.findOneAndUpdate({_id:req.params.id},req.body).then(function(data){
            
        return res.status(200).json({
            message: 'Updated',
            titleData:data
        })
      
        
    }).catch(next)
})



router.post('/category/all', (req, res, next) => {
    var title_id = req.body.title_id
    console.log(title_id)
   
    category_type.find({title_id:title_id}).then(data => {
        return res.status(201).json({
            message: 'success',
            categoryData:data,
            
        })
    
    })
})

router.get('/category/all', (req, res, next) => {
   
    category_type.find({}).then(data => {
        return res.status(200).json({
            message: 'success',
            categoryData:data,
            
        })
    
      
    })
})

router.post('/createSub_category', (req, res, next) => {
    if (req.body.sub_category === "") {
        res.send('Failed to add')
    } else {
        subcategory_type.create(req.body).then(data => {
            res.redirect('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:3000/SubCategory.html')
       
        })
    }
})

router.put('/updateSub_category/:id',function(req,res,next){
    subcategory_type.findOneAndUpdate({_id:req.params.id},req.body).then(function(data){
            
        return res.status(200).json({
            message: 'Updated',
            subcategoryData:data
        })
      
        
    }).catch(next)
})


router.get('/sub_category/all', (req, res, next) => {
    
    subcategory_type.find({}).then(data => {
        return res.status(201).json({
            message: 'success',
            sub_categoryData:data
        })
    
    })
})

router.post('/subCategory/all', (req, res, next) => {
    var id = req.body.category_id
   console.log(id)
    subcategory_type.find({category_id:id}).then(data => {
        return res.status(201).json({
            message: 'success',
            sub_categoryData:data
        })
    
       
    })
})

router.get('/allSongCounter',(req,res,next)=>{
    song.find({}).then(data=>{
        return res.status(201).json({
            message: 'success',
            cnt:data.length
        })
    
    })
})


module.exports = router