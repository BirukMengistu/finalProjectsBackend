const { exists } = require('./referenceSchema');
const Reference = require('./referenceSchema');

exports.getReference = async (req, res) => {

  try {
    const data = await Reference.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Something went wrong when fetching the References',
      err
    })
  }

}

exports.getReferenceById = (req, res) => {

  Reference.exists({ _id: req.params.id }, (err, Reference) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!Reference) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this Reference does not exist',
      })
    }


    Reference.findById(req.params.id)
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


exports.createReference = (req, res) => {

  Reference.exists({ _id: req.body._id }, (err, result) => {

    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'A Reference by that userId already exists, please update Reference instead'
      })
    }

  
   
   
    // const newReference = new Resume({})
    // newResume.save()

    Reference.create({
        title:   req.body.Title,
        company:  req.body.company,
        lastName:  req.body.lastName,
        telephone:  req.body.telephone,
        email:  req.body.email,
        firstName:   req.body.firstName, 
        userId:  req.body.userId,
    })
    .then(data => {
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: 'Reference created successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Failed to create Reference',
        err
      })
    })
  })

}


exports.updateReference = (req, res) => {

    Reference.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this Reference does not exist',
      })
    }

    Reference.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Reference updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A Reference with that name already exists',
            err
          })
        }

        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to update Reference',
          err
        })

      })
  })

}



exports.deleteReference = (req, res) => {

    Reference.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this Reference does not exist',
      })
    }


    Reference.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Reference deleted',
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to delete Reference',
          err
        })
      })
  })

}