const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId


const User = new schema({
    id:ObjectID, 
    name:{
        type:String,
        required:true,

    },
    fullname:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
       type:String,
       required:true 
    },
    password:{
        type:String,
        required:true
    },
    deviceId:{
        type:String,
        required:true
    },
    timeStamp:{
        type:Date,
        required:true
    },
    profileUrl:{   
        type:String
    },
    planId:{
        type:String,
        required:true
    },
    destination:String,
    filename:String,
    download:String,

})

module.exports = mongoose.model('User',User)