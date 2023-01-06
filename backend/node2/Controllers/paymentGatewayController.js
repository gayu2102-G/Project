require('dotenv').config();
const formidable = require('formidable');
const { v4: uuidv4 } = require ('uuid');
const https = require('https');
const PaytmChecksum = require('./PaytmChecksum');


exports.Payment = (req, res) => {
   const { amount, email } = req.body;
   const totalAmount = JSON.stringify(amount);
   var params = {};
   params['MID'] = process.env.PAYTM_MID;
   params['WEBSITE'] = process.env.PAYTM_WEBSITE;
   params['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
   params['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
   params['ORDER_ID'] = uuidv4();
   params['CUST_ID'] = process.env.PAYTM_CUST_ID;
   params['TXN_AMOUNT'] = totalAmount;
   params['CALLBACK_URL'] ='http://localhost:3000/api/callback';
   params['EMAIL'] = email;
   



   let paytmChecksum = PaytmChecksum.generateSignature(
      params,
      process.env.PAYTM_MERCHANT_KEY
   );

   paytmChecksum.then(response => {
     let paytmChecksumResponse = {
        ...params,
        "CHECKSUMHASH": response
     };
     res.json({ checkSumResponse: paytmChecksumResponse });
   }).catch(error => {
      console.log(error);
      res.status(404).json({
         message: error
      });
   });
}

exports.callback = (req, res) => {
   const form = new formidable.IncomingForm();
   form.parse(req, (error, fields, file) => {
     if (error) {
        console.log(error);
        res.status(500).json({ error });
     }
     let checkSumHash = fields.CHECKSUMHASH;
     delete fields.CHECKSUMHASH;

     // verify the signature
     var isVerifySignature = PaytmChecksum.verifySignature(
        fields,
        process.env.PAYTM_MERCHANT_KEY,
        checkSumHash
     )

     if (isVerifySignature) {
        // response is valid
        // get the transaction status
        // any communication with Paytm, server has to be secure
        var params = {};
        params["MID"] = fields.MID;
        params["ORDER_ID"] = fields.ORDERID;

        PaytmChecksum.generateSignature(
           params,
           process.env.PAYTM_MERCHANT_KEY
        ).then(checksum => {
           // go to paytm server and get the status 
           params["CHECKSUMHASH"] = checksum;
           var data = JSON.stringify(params);
           var options = {
              hostname: "securegw-stage.paytm.in",
              port: 443,
              path: "/order/status",
              method: "POST",
              headers: {
                 'Content-Type': "application/json",
                 'Content-Length': data.length
              }
           };

           var response = "";
           var request = https.request(options, (responseFromPaytm) => {
              responseFromPaytm.on('data', (chunk) => {
                 response += chunk;
              });
              responseFromPaytm.on('end', () => {
                 console.log(response);
                 res.json(response);
              });
           });
           request.write(data);
           request.end();
        })
     } else {
        console.log("Checksum Mismatch");
        res.status(500).json({ error: "Its a hacker !" });
     }
   
   });
}
