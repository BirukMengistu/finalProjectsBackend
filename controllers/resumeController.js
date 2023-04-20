const router = require('express').Router();
const resumeModel = require('../models/resume/resumeModel');
const auth = require('../authentication/auth');

// Get all products
router.get('/', resumeModel.getResumes);

//Get one Resume by id
router.get('/:id', resumeModel.getResumeById)

//create new Resume
router.post('/', auth.verifyToken, resumeModel.createResume);

// Update Resume
router.patch('/:id', auth.verifyToken, resumeModel.updateResume);
router.put('/:id', auth.verifyToken, resumeModel.updateResume);

//Delete Resume
router.delete('/:id', auth.verifyToken, resumeModel.deleteResume);


module.exports = router;