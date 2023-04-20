const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();


const userController = require('./controllers/userController');
const resumeController = require('./controllers/resumeController');
const profileController = require('./controllers/profileController');
const blogController = require('./controllers/blogController');
// MIDDLEWARE
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// CONTROLLERS

app.use('/api/users', userController);
app.use('/api/resume', resumeController);
app.use('/api/profile', profileController);
app.use('/api/blog', blogController);


module.exports = app


