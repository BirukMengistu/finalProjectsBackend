const { exists } = require('./educationSchema');
const Education = require('./educationSchema');

exports.getEducation = async (req, res) => {

  try {
    const data = await Education.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Something went wrong when fetching the Educations',
      err
    })
  }

}

exports.getEducationById = (req, res) => {

  Education.exists({ _id: req.params.id }, (err, Education) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!Education) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this Education does not exist',
      })
    }


    Education.findById(req.params.id)
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


exports.createEducation = (req, res) => {

  Education.exists({ _id: req.body._id }, (err, result) => {

    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'A Education by that userId already exists, please update Education instead'
      })
    }

  
   
    // const newEducation = new Resume({})
    // newEducation.save()

    Education.create({
       institute:  req.body.institute,
       program:  req.body.program,
       startedAt:  req.body.startedAt,
       endedAt:  req.body.endedAt,
       userId:  req.body.userId,
    })
    .then(data => {
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: 'Education created successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Failed to create Education',
        err
      })
    })
  })

}


exports.updateEducation = (req, res) => {

    Education.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this Education does not exist',
      })
    }

    Education.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Education updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A Education with that name already exists',
            err
          })
        }

        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to update Education',
          err
        })

      })
  })

}



exports.deleteEducation = (req, res) => {

    Education.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this Education does not exist',
      })
    }


    Education.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Education deleted',
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to delete Education',
          err
        })
      })
  })

}