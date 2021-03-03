var express = require('express');
var router = express.Router();

var request = require('request');

router.get('/', function (req, res) {
    res.json({error:'error'})
});

router.post('/instamojo', function (req, res) {




    if (!req.body.purpose || !req.body.amount || !req.body.email) {
        res.status(400).json({ success: false, message: 'Needed fields mismatch.', statusCode: 400 });
    } else {

        var headers = { 'X-Api-Key': '0fa8b5b6575320ca4709d43052d4e6cf', 'X-Auth-Token': '2642961c090cae508ff647d599f9e6ef'}
        var payload = {
            purpose: req.body.purpose,
            amount: req.body.amount,
            buyer_name: req.body.buyer_name,
            redirect_url: 'http://example.com/',
            send_email: true,
            email: req.body.email,
            allow_repeated_payments: false
        }
        console.log(payload);
        request.post('https://www.instamojo.com/api/1.1/payment-requests/', { form: payload, headers: headers }, function (error, response, body) {
            if (!error && response.statusCode == 201) {
                let data = JSON.parse(response.body)
                console.log(data.payment_request.longurl)

                res.status(200).json({ success: true, message: 'Initiating payment gateway.', statusCode: 200, url : data.payment_request.longurl,paymentData:data});

            }else{
                console.log(error)
            }
        })




    }
});

router.get('/instamojo/:id',function(req, res){
    var headers = { 'X-Api-Key': '0fa8b5b6575320ca4709d43052d4e6cf', 'X-Auth-Token': '2642961c090cae508ff647d599f9e6ef'}
       
    request.get('https://www.instamojo.com/api/1.1/payment-requests/'+req.params.id, {headers: headers}, function(error, response, body){
        let data = JSON.parse(response.body)  
    if(!error && response.statusCode == 200){
        res.status(200).json({ success: true, statusCode: 200, paymentData:data});
      }
    })
    

})

router.get('/allRequest',(req,res)=>{
    var headers = { 'X-Api-Key': '0fa8b5b6575320ca4709d43052d4e6cf', 'X-Auth-Token': '2642961c090cae508ff647d599f9e6ef'}
     
    request.get('https://www.instamojo.com/api/1.1/payment-requests/', {headers: headers}, function(error, response, body){
        let data = JSON.parse(response.body)  
   
    if(!error && response.statusCode == 200){
    res.status(200).json({  paymentData:data});
  
  }
})
})


module.exports = router;
