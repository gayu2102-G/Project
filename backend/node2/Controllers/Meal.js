
const meal = require('../Models/meal');

exports.getMealList = (req,res) => {
    meal.find().then(result => {
       res.status(200).json({
            message: "meal data fetch successfully",
            meal: result
        });
    }).catch(error => {
        res.status(500).json ({
            message: error
        });
});
}
