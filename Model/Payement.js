const mongoose = require('mongoose')
const schema = mongoose.Schema
const ObjectID=schema.Types.ObjectId

const payment = new schema({
    id:ObjectID,
    userId:String,
    payment_id:String,
    timeStamp:Date,
    paymentStatus:String,
    plan_id:String,
    month:String,
    total_amount:String,
    
})

const Payment = mongoose.model('Payment',payment);
module.exports=Payment