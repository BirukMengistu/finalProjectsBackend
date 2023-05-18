const router = require('express').Router();
const blogModel = require('../models/blog/blogModel');
const auth = require('../authentication/auth');

// Get all blogs
router.get('/', blogModel.getBlogs);

//Get one blog by id
router.get('/:id', blogModel.getBlogById);

//create new product
router.post('/', auth.verifyToken, blogModel.createBlog);

// Update product
router.patch('/:id', auth.verifyToken, blogModel.updateBlog);
router.put('/:id', auth.verifyToken, blogModel.updateBlog);

//Delete blog
router.delete('/:id', auth.verifyToken, blogModel.deleteBlog);


module.exports = router;