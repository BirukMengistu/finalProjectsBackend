
/* const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT ;

const serverURI = 'http://localhost:' + PORT;
const mongoURI = process.env.MONGO_URI;
mongoose.set('strictQuery', false)

 if(!mongoURI) {
  console.log('no environment variable found.')
} else {
  mongoose.connect(mongoURI, () => console.log(serverURI))
}  */










require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");



const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(cors({
  origin: '*'
}))
const userController = require('./controllers/userController');
const resumeController = require('./controllers/resumeController');
const profileController = require('./controllers/profileController');
const blogController = require('./controllers/blogController');
// MIDDLEWARE
// CONTROLLERS

app.use('/api/users', userController);
app.use('/api/resume', resumeController);
app.use('/api/profile', profileController);
app.use('/api/blog', blogController);


// Connect to MongoDB

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  mongoose.set('strictQuery', true)

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is up and running on port ${port}`)
})



