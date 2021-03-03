const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const Notification = new schema({
    id:ObjectID,
    api_key:String,
    Device_tokens:String,
    message:String
})

const notification = mongoose.model('Notification',Notification)
module.exports = notification