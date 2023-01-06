const Order = require('../Models/Order');

exports.getOrderForUser = (req, res) =>
{
Order.find({ 
  username: req.params.username
}).then(result => {
    res.status(200).json({
        Order:  result,
        message: "Success"
    });
}).catch(error => {
    res.status(500).json({
        message: error
    });
});
}

exports.saveOrderForUser = (req, res) =>
{
//see the user creation API
const username = req.body.username;
const mobilenumber = req.body.mobilenumber;
const address = req.body.address;
const total = req.body.total;

const signupUser = new Order({ //model class
   username:username,
   mobilenumber:mobilenumber,
   address:address,
   total:total
});
signupUser.save().then(
    result => {
        res.status(200).json({
            message : "Order save Successfully",
            user : result
        })
    }
).catch(
    error => {
        res.status(500).json({
            message : error
        })
    }
);
}


