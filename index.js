const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
//setting up the app
const app = express()
const cors=require('cors')
//connect to the monogo db
mongoose
  .connect(
    'mongodb://localhost:27017/Flow',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))
mongoose.Promise = global.Promise;
app.use(express.static('imageUploads'));
app.use(cors())
app.use(bodyparser.json({limit: "50mb"}));
app.use(bodyparser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyparser.json())
app.use('/admin', require('./Routes/Admin'))
app.use('/plan',require('./Routes/Plan'))
app.use('/trail',require('./Routes/Trail'))
app.use('/phrases',require('./Routes/Phrases'))
app.use('/notification',require('./Routes/Notification'))
app.use('/accessToken',require('./Routes/AccessToken'))
app.use('/audio', require('./Routes/audioStream'))
app.use('/user', require('./Routes/User'))
app.use('/blog', require('./Routes/Blog'))
app.use('/paymentTrack',require('./Routes/Payment'))
app.use('/payment',require('./Routes/Instamoho'))
app.use("/emailOtp",require('./Routes/verify'))
const port=process.env.PORT || 8080
app.listen(port, () => {
    console.log('Running on port 8080')
})
