const router = require('express').Router();
const supportModel = require('../models/support/supportModel');
const auth = require('../authentication/auth');

// Get all support
router.get('/', supportModel.getsupports);

//Get one Support by id
router.get('/:id', supportModel.getSupportById);

//create new product
router.post('/', supportModel.createSupport);

// Update product
router.patch('/:id', auth.verifyToken, supportModel.updateSupport);
router.put('/:id', auth.verifyToken, supportModel.updateSupport);

//Delete blog
router.delete('/:id', auth.verifyToken, supportModel.deleteSupport);


module.exports = router;