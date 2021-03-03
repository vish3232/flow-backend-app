const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const Category = new schema({
    id:ObjectID,
    category_name:String,
    category_decscription:String,
    title_id:String,
    category_image_url:String,
    colour:String,
    destination:String,
    filename:String,
   

})

const category1 = mongoose.model('Category',Category)
module.exports = category1