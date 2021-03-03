const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const Phrases = new schema({
    id:ObjectID,
   phrase :String
})

const phrases = mongoose.model('Phrases',Phrases)
module.exports = phrases