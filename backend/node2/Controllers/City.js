


const city = require ('../Models/City');
const restaurantList = require('../Models/Restaurant');


exports.getCityfilterList = (req,res) =>
{

  const city_name = req.body.city_name;
  const cost = req.body.cost;

city.find({ 
     city_name:city_name,
     cost:cost
})

    .then(result => {
        res.status(200).json({
            message:"city data fetch successfully",
         cities:result
        });
    }).catch(error =>
        {
            res.status(500).json({
                message : error
            });
           
        });
}

exports.getCityList = (req,res) =>
{
city.find().then(result => {
        res.status(200).json({
            message:"city data fetch successfully",
         cities:result
        });
    }).catch(error =>
        {
            res.status(500).json({
                message : error
            });
           
        });
}





exports.getRestaurantsByCity = (req, res) => {
   
    restaurantList.find({ 
        city: req.params.city.toString()
    }).then(result => {
        res.status(200).json({
            restaurants:  result,
            message: "Success"
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}