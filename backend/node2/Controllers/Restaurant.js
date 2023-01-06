
const Restaurant = require('../Models/Restaurant');
const restaurantList =require('../Models/Restaurant');

exports.getfilter = (req, res) => {
  
    const mealtype_id= req.body.mealtype_id;
    const cuisine_id=req.body.cuisine_id;

    const payload = {
      'type.mealtype':  mealtype_id,
      'Cuisine.cuisine': cuisine_id
      
    }

    if(cuisine_id){
      payload['Cuisine.cuisine'] = cuisine_id;
    }

    Restaurant.find(payload)
   .then(result => {
    console.log(result);
    res.status(200).json({
      message: "Filter  list fetch successfully",
     restaurants: result
    });
    }).catch(error => {
       console.log(error);
       res.status(500).json({
        message : error
    });
       
    });
}




exports.getRestaurantsById = (req, res) => {
 
 Restaurant.find({ 
        _id: req.params.id
       
    }).then(result => {
        res.status(200).json({
            restaurants:  result[0],
            message: "Success"
        });
    }).catch(error => {
        res.status(500).json({
            message: error
        });
    });
}