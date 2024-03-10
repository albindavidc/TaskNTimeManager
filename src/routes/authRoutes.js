const express = require('express');
const router=express.Router();

//authcontroller
const authController=require('../controller/authController');

const {isLoggedOut}=require('../middleware/logoutMiddileware');

//user

router.get('/login',isLoggedOut,authController.getUserLogin);
router.get('/register',isLoggedOut,authController.getUserRegister);

router.post('/login', authController.userLogin);
router.post('/register', authController.userRegister);


//admin
router.get('/admin/login', authController.getAdminLogin);
router.get('/admin/register', authController.getAdminRegister);

router.post('/admin/login', authController.adminLogin);
router.post('/admin/register', authController.adminRegister);

router.get('/logout',authController.getUserLogout);
router.get('/admin/logout',authController.AdminLogout);

module.exports=router;