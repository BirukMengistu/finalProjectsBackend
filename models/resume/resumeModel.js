const { exists } = require('./resumeSchema');
const Resume = require('./resumeSchema');

exports.getResumes = async (req, res) => {

  try {
    const data = await Resume.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Something went wrong when fetching the Resumes',
      err
    })
  }

}

exports.getResumeById = (req, res) => {

  Resume.exists({ _id: req.params.id }, (err, Resume) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!Resume) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this Resume does not exist',
      })
    }


    Resume.findById(req.params.id)
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


exports.createResume = (req, res) => {

  Resume.exists({ userId: req.body.userId }, (err, result) => {

    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'A Resume by that userId already exists, please update Resume instead'
      })
    }


   
    // const newResume = new Resume({})
    // newResume.save()

    Resume.create({
     
      technical_Skil:  req.body.technical_Skil,
      summary:   req.body.summary,
      language:  req.body.language,
      userId:  req.body.userId,
      hobby:  req.body.hobby
    })
    .then(data => {
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: 'Resume created successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Failed to create Resume',
        err
      })
    })
  })

}


exports.updateResume = (req, res) => {

  Resume.exists({ _id: req.params.id }, (err, result) => {

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

    Resume.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Resume updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A Resume with that name already exists',
            err
          })
        }

        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to update Resume',
          err
        })

      })
  })

}



exports.deleteResume = (req, res) => {

  Resume.exists({ _id: req.params.id }, (err, result) => {

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


    Resume.deleteOne({ _id: req.params.id })
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
          message: 'Failed to delete Resume',
          err
        })
      })
  })

}