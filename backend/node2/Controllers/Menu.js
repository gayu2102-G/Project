const Menu = require('../Models/menu');

exports.getMenuForRestaurant = (req, res) =>
{
Menu.find({ 
  restaurantId: req.params.id
}).then(result => {
    res.status(200).json({
        menu:  result,
        message: "Success"
    });
}).catch(error => {
    res.status(500).json({
        message: error
    });
});
}