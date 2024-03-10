const express = require('express')
const router = express.Router()

// Admin Controller
const adminController = require('../controller/adminController')
const { isAdmin, isAdminLoggedIn} = require('../middleware/authMiddleware')

router.get('/', isAdmin, isAdminLoggedIn, adminController.getDashboard)
router.get('/add-user', isAdmin, isAdminLoggedIn, adminController.getAddUser);
router.post('/add-user', isAdmin, isAdminLoggedIn, adminController.addUser);
router.get('/view/:id',  isAdminLoggedIn, adminController.viewUser);
router.get('/edit/:id',  isAdminLoggedIn, adminController.editUser);
router.put('/edit/:id',adminController.editPost);
router.delete('/edit/:id',adminController.deleteUser);
router.post('/search', isAdminLoggedIn,adminController.searchUser);



module.exports = router