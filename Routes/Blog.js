const express = require('express')
const router = express.Router()
const fs = require('fs')
const multer = require('multer')
const blog = require('../Model/Blog')

//configuring the multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageUploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//declaring the multer
let upload = multer({ storage: storage }).single('image')

router.post('/uploadblog', upload, (req, res, next) => {
    console.log(req.body)
    const file = req.file
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    if(req.body.title === "" || req.body.content === "")
    {
        res.send('Some fields are missing failed to upload')

    }else{
        blog.create({ title: req.body.title, content: req.body.content, destination: file.destination, filename: file.filename, download: file.path }).then(data => {
            res.redirect('http://ec2-65-0-204-42.ap-south-1.compute.amazonaws.com:3000/Blog.html')
        })
    }
})

router.put('/updateBlog/:title',upload,function(req,res,next){
    const file = req.file
    console.log(req.file)
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
  
    blog.findOneAndUpdate({title:req.params.title},{title: req.body.title, content: req.body.content, destination: file.destination, filename: file.filename, download: file.path}).then(function(data){
            
        return res.status(200).json({
            message: 'Updated',
            blogData:data
        })
      
        
    }).catch(next)
})


router.get('/blogimage/:id', (req, res, next) => {

    blog.findById(req.params.id).then(data => {
        let filePath = './imageUploads/' + data.filename
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
                'Content-Type': 'image/jpg'
            }
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'image/jpg',
            }
            res.writeHead(200, head)
            fs.createReadStream(filePath).pipe(res)
        }
    }).catch(err=>{
        console.log(err)
    })
})

router.get('/all',(req, res, next)=>{
    blog.find().then(data=>{
        return res.status(201).json({
            message: 'success',
            blogData:data
        })
    })
})


router.delete('/:id', (req, res, next) => {
    
    console.log(req.params.id)
    blog.deleteOne({ _id: req.params.id }).then(data => {
        if (data.deletedCount === 1) {
                    res.send({message:'File Deleted Succesfully'})
                }
           
        
    })
})


module.exports = router