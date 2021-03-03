const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const Admin = new schema({
    id:ObjectID,
   
    userName:String,
    password:String,
})

const admin = mongoose.model('Admin',Admin)
module.exports = admin