const express = require ('express');
const port =4000;
const router = require('./Routes/router');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use((req,res,next) => {
   res.setHeader('Access-Control-Allow-Origin','*');
   res.setHeader('Access-Control-Allow-Methods','GET_POST');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

app.use('/api',router);




mongoose.connect(
   'mongodb://127.0.0.1:27017/zomato',
  
    { useNewUrlParser: true ,useUnifiedTopology:true }

    ).then(sucess => {
    console.log("connected to mongodb");

    app.listen(port,() => {
        console.log(`server running at :${port}`); 
       
     });

   
    }).catch(Error => { 
    console.log('Error');
    });

   
