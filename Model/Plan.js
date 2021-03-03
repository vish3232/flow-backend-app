const mongoose = require('mongoose')
const schema = mongoose.Schema

const ObjectID=schema.Types.ObjectId
 
const Plan = new schema({
    id:ObjectID,
    name:String,
    plan_price_per_month:String,
    plan_price_per_year:String

})

const plan = mongoose.model('Plan',Plan)
module.exports = plan