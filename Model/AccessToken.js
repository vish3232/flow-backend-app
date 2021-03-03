const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const AccessToken = new schema({
    id:ObjectID,
   
    accessToken:String,
    user_id:String,
    timeStamp:String
})

const accessToken = mongoose.model('AccessToken',AccessToken)
module.exports = accessToken