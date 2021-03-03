var express=require('express')
var nodemailer=require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
const router=express.Router();
process.env.GMAIL_USER="flowforsport@gmail.com";
process.env.GMAIL_PASS="flow1234@"
var smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:  587,
    secure: false,

    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});
const user=require('../Model/User')

var rand,mailOptions,host,link;

router.get('/send',function(req,res){
    user.find({email:req.query.to}).then(data=>{
        console.log(data.length)
    if(data.length===0){
        res.status(400).json({
            message:'email does not exits'
        })
     
    }else{
    rand=Math.floor(1000 + Math.random() * 9000)
host=req.get('host');
link="http://"+req.get('host')+"/api/verify?id="+rand;
mailOptions={
    to : req.query.to,
    subject : "Please confirm your Email account",
    
    html : "Hello,otp is "+rand+" "
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
 if(error){
        console.log(error);
        res.status(400).json({
            message:'mail not send',
            err:error
        })
 }else{
        console.log("Message sent: " + response.message);
        res.status(200).json({
            message:'mail send'
        })
     }
});
    }
})
    
});

router.get('/verify',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    console.log(req.query.id)
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand)
        {
            console.log("email is verified");
            
            res.status(200).json({
                message:'user verified'
            })
        }
        else
        {
            console.log("email is not verified");
            res.status(400).json({
                message:'user is not verified'
            })
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
    });
module.exports=router;

