const express = require('express');
const router=express.Router();

//authcontroller
const userController=require('../controller/userController');
const {isLoggedIn} = require('../middleware/authMiddleware');


//getHome
router.get('/', isLoggedIn,userController.userHome);

module.exports=router;
