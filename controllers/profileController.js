const router = require('express').Router();
const profileModel = require('../models/profile/profileModel');
const auth = require('../authentication/auth');

// Get all profiles
router.get('/', profileModel.getProfiles);

//Get one profile by id
router.get('/:id', profileModel.getProfileById);

//create new profile
router.post('/', auth.verifyToken, profileModel.createProfile);

// Update profile
router.patch('/:id', auth.verifyToken, profileModel.updateProfile);
router.put('/:id', auth.verifyToken, profileModel.updateProfile);

//Delete profile
router.delete('/:id', auth.verifyToken, profileModel.updateProfile);


module.exports = router;