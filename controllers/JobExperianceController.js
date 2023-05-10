const router = require('express').Router();
const JobExperiance = require('../models/resume/JobExperianceModel');
const auth = require('../authentication/auth');

// Get all JobExperiances
router.get('/', JobExperiance.getJobExperiance);

//Get one JobExperiance by id
router.get('/:id', JobExperiance.getJobExperianceById);

//create new JobExperiance
router.post('/', auth.verifyToken, JobExperiance.createJobExperiance);

// Update JobExperiance
router.patch('/:id', auth.verifyToken, JobExperiance.updateJobExperiance);
router.put('/:id', auth.verifyToken, JobExperiance.updateJobExperiance);

//Delete JobExperiance
router.delete('/:id', auth.verifyToken, JobExperiance.deleteJobExperiance);


module.exports = router;