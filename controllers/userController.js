const router = require('express').Router();
const userModel = require('../models/users/userModel');
const auth = require('../authentication/auth');
//Register a new user
router.post('/register', userModel.registerUser);

//Login a user
router.post('/login', userModel.loginUserWithEmailAndPassword);
//Get a user
router.get('/user',  userModel.getUsers);
//Update a user
router.put('/user/:id', auth.verifyToken, userModel.updateUser);
module.exports = router;

