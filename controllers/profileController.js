const router = require('express').Router();
const profileModel = require('../models/profile/profileModel');
const auth = require('../authentication/auth');

// Get all products
router.get('/', profileModel.getProfiles);

//Get one product by id
router.get('/:id', profileModel.getProfileById);

//create new product
router.post('/', auth.verifyToken, profileModel.createProfile);

// Update product
router.patch('/:id', auth.verifyToken, profileModel.updateProfile);
router.put('/:id', auth.verifyToken, profileModel.updateProfile);

//Delete product
router.delete('/:id', auth.verifyToken, profileModel.updateProfile);


module.exports = router;