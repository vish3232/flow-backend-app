const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId
 
const Trail = new schema({
    id:ObjectID,
    userId:String,
    start_Date:Date,
    end_Date:Date

})

const trail = mongoose.model('Trial',Trail)
module.exports = trail