const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const Title = new schema({
    id:ObjectID,
   
    name:String
})

const title = mongoose.model('Title',Title)
module.exports = title