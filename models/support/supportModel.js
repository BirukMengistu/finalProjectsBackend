const { exists } = require('./supportSchema')
const Support = require('./supportSchema');
const User = require('../users/userSchema')
exports.getsupports = async (req, res) => {

  try {
    const data = await Support.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Something went wrong when fetching the supports',
      err
    })
  }

}

exports.getSupportById = (req, res) => {

  Support.exists({ _id: req.params.id }, (err, support) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!Support) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this support does not exist',
      })
    }


    Support.findById(req.params.id)
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


exports.createSupport = (req, res) => {

  Support.exists({ _id: req.body._Id }, (err, result) => {
  
    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'A Support by that userId already exists, please update Support instead'
      })
    }

   
   
    // const newSupport = new Support({})
    // newSupport.save()
    
    
   
    Support.create({
      
      name:  req.body.name,
      email:  req.body.email,
      subject:   req.body.subject,
      message:   req.body.message,
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


exports.updateSupport = (req, res) => {

  Support.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this Support does not exist',
      })
    }

    Support.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Support updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A Support with that name already exists',
            err
          })
        }

        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to update Support',
          err
        })

      })
  })

}



exports.deleteSupport = (req, res) => {

  Support.exists({ _id: req.params.id }, (err, result) => {

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


    Support.deleteOne({ _id: req.params.id })
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
          message: 'Failed to delete Support',
          err
        })
      })
  })

}