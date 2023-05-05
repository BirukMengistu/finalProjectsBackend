const { exists } = require('./blogSchema');
const Blog = require('./blogSchema');
const User = require('../users/userSchema')
exports.getBlogs = async (req, res) => {

  try {
    const data = await Blog.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Something went wrong when fetching the Blogs',
      err
    })
  }

}

exports.getBlogById = (req, res) => {

  Blog.exists({ _id: req.params.id }, (err, Blog) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!Blog) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this Blog does not exist',
      })
    }


    Blog.findById(req.params.id)
      .then(data => res.status(200).json(data))
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: err.message || 'Internal server error',
        })
      })

  })

}


exports.createBlog = (req, res) => {

  Blog.exists({ _id: req.body._Id }, (err, result) => {
  
    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'A Blog by that userId already exists, please update Blog instead'
      })
    }

   
   
    // const newBlog = new Blog({})
    // newBlog.save()
    
    
   
    Blog.create({
      
      authour:  req.body.authour,
      tittle:  req.body.tittle,
      body:   req.body.body,
      createdAt:  req.body.createdAt,
      tag:  req.body.tag,
      userId:   req.body.userId,
      review:req.body.review
    })
    .then(data => {
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: 'Blog created successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Failed to create Blog',
        err
      })
    })
  })

}


exports.updateBlog = (req, res) => {

  Blog.exists({ _id: req.params.id }, (err, result) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!result) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this Blog does not exist',
      })
    }

    Blog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Blog updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A Blog with that name already exists',
            err
          })
        }

        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to update Blog',
          err
        })

      })
  })

}



exports.deleteBlog = (req, res) => {

  Blog.exists({ _id: req.params.id }, (err, result) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!result) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this Resume does not exist',
      })
    }


    Blog.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Resume deleted',
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to delete Blog',
          err
        })
      })
  })

}