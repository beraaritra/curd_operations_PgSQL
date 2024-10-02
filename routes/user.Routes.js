const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/create', userController.createUser);

//get all the users
router.get('/read', userController.getAllUsers);

// get all the user  by their id
router.get('/read/:id', userController.getUserById);

router.put('/update/:id', userController.updateUser);

router.delete('/delete/:id', userController.deleteUser);

module.exports = router; 
