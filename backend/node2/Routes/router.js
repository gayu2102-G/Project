const express = require('express');


const router = express.Router();

const cityController = require('../Controllers/City');
router.get('/cityList',cityController.getCityList);
router.post('/cityfilterList',cityController.getCityfilterList);
router.get('/getRestaurantsByCity/:city', cityController.getRestaurantsByCity);

const mealController = require('../Controllers/Meal');
router.get('/mealList',mealController.getMealList);

const mealtypeController = require('../Controllers/Mealtype');
router.get('/mealtype',mealtypeController.getMealtypeList);

const restaurantController = require('../Controllers/Restaurant');
router.post('/restaurantFilter',restaurantController.getfilter);
router.get('/getRestaurantsById/:id', restaurantController.getRestaurantsById);

const menuController = require('../Controllers/Menu');
router.get('/getMenuForRestaurant/:id',menuController.getMenuForRestaurant);

const OrderController = require('../Controllers/Order');
router.get('/getOrderForUser/:username',OrderController.getOrderForUser);
router.post('/saveOrderForUser',OrderController.saveOrderForUser);

const paymentGatewayController = require('../Controllers/paymentGatewayController');
router.post('/Payment',paymentGatewayController.Payment);
router.post('/callback',paymentGatewayController.callback);

const userController = require('../Controllers/User');
router.post('/signup',userController.signup);
router.post('/Login',userController.Login);



module.exports = router;