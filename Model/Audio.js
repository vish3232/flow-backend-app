const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const songs = new schema({
    id:ObjectID,
    sub_category_id:String,
    destination:String,
    filename:String,
    download:String,
    playlistname:String,
    audioStatus:String,
})

const song = mongoose.model('Songs',songs);
module.exports=song