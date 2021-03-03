const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const Sub_Category = new schema({
    id:ObjectID,
    sub_category_name :String,
    category_id:String
})

const sub_cat = mongoose.model('Sub_Category',Sub_Category)
module.exports = sub_cat