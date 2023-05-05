const router = require('express').Router();
const projectModel = require('../models/resume/projectModel');
const auth = require('../authentication/auth');

// Get all projects
router.get('/', projectModel.getProject);

//Get one project by id
router.get('/:id', projectModel.getProjectById)

//create new project
router.post('/', auth.verifyToken, projectModel.createProject);

// Update project
router.patch('/:id', auth.verifyToken, projectModel.updateProject);
router.put('/:id', auth.verifyToken, projectModel.updateProject);

//Delete project
router.delete('/:id', auth.verifyToken, projectModel.deleteProject);


module.exports = router;