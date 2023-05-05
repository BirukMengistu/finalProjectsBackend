const router = require('express').Router();
const educationModel = require('../models/resume/educationModel');
const auth = require('../authentication/auth');

// Get all educations
router.get('/', educationModel.getEducation);

//Get one education by id
router.get('/:id', educationModel.getEducationById)

//create new education
router.post('/', auth.verifyToken, educationModel.createEducation);

// Update education
router.patch('/:id', auth.verifyToken, educationModel.updateEducation);
router.put('/:id', auth.verifyToken, educationModel.updateEducation);

//Delete education
router.delete('/:id', auth.verifyToken, educationModel.deleteEducation);


module.exports = router;