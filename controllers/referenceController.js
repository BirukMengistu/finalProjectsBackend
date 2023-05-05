const router = require('express').Router();
const referenceModel = require('../models/resume/referenceModel');
const auth = require('../authentication/auth');

// Get all references
router.get('/', referenceModel.getReference);

//Get one reference by id
router.get('/:id', referenceModel.getReferenceById);

//create new reference
router.post('/', auth.verifyToken, referenceModel.createReference);

// Update reference
router.patch('/:id', auth.verifyToken, referenceModel.updateReference);
router.put('/:id', auth.verifyToken, referenceModel.updateReference);

//Delete reference
router.delete('/:id', auth.verifyToken, referenceModel.deleteReference);


module.exports = router;