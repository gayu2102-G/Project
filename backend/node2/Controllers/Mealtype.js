const mealtype = require('../Models/mealtype');

exports.getMealtypeList = (req,res) => {
    mealtype.find().then(result => {
        console.log(result);
       res.status(200).json({
            message: "mealtype data fetch successfully",
            mealtype: result
        });
    }).catch(error => {
        res.status(500).json ({
            message: error
        });
});
}
