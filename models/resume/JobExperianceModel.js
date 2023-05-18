

  const { exists } = require('./JobExperianceSchema');
  const JobExperiance = require('./JobExperianceSchema');
  
  exports.getJobExperiance = async (req, res) => {
  
    try {
      const data = await JobExperiance.find()
      res.status(200).json(data)
    } 
    catch (err) {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Something went wrong when fetching the JobExperiance',
        err
      })
    }
  
  }
  
  exports.getJobExperianceById = (req, res) => {
  
    JobExperiance.exists({ _id: req.params.id }, (err, JobExperiance) => {
  
      if(err) {
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: 'You made a bad request',
        })
      }
  
      if(!JobExperiance) {
        return res.status(404).json({
          statusCode: 404,
          status: false,
          message: 'Ooops, this JobExperiance does not exist',
        })
      }
  
  
      JobExperiance.findById(req.params.id)
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
  
  
  exports.createJobExperiance = (req, res) => {
  
    JobExperiance.exists({ _id: req.body._id }, (err, result) => {
  
      if(err) {
        return res.status(500).json(err)
      }
  
      if(result) {
        return res.status(400).json({
          statusCode: 400,
          status: false,
          message: 'A JobExperiance by that userId already exists, please update JobExperiance instead'
        })
      }
  
    
     
      // const newJobExperiance = new Resume({})
      // newJobExperiance.save()
  
      JobExperiance.create({
         company:  req.body.company,
         title:  req.body.title,
         startedAt:  req.body.startedAt,
         endedAt:  req.body.endedAt,
         userId:  req.body.userId,
         responsibility:  req.body.responsibility,

         
       
      })
      .then(data => {
        res.status(201).json({
          statusCode: 201,
          status: true,
          message: 'JobExperiance created successfully',
          data
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to create JobExperiance',
          err
        })
      })
    })
  
  }
  
  
  exports.updateJobExperiance = (req, res) => {
  
      JobExperiance.exists({ _id: req.params.id }, (err, result) => {
  
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
          message: 'Ooops, this JobExperiance does not exist',
        })
      }
  
      JobExperiance.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(data => {
          res.status(200).json({
            statusCode: 200,
            status: true,
            message: 'JobExperiance updated successfully',
            data
          })
        })
        .catch(err => {
  
          if(err.code === 11000) {
            return res.status(400).json({
              statusCode: 400,
              status: false,
              message: 'A JobExperiance with that name already exists',
              err
            })
          }
  
          res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Failed to update JobExperiance',
            err
          })
  
        })
    })
  
  }
  
  
  
  exports.deleteJobExperiance = (req, res) => {
  
      JobExperiance.exists({ _id: req.params.id }, (err, result) => {
  
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
          message: 'Ooops, this JobExperiance does not exist',
        })
      }
  
  
      JobExperiance.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            statusCode: 200,
            status: true,
            message: 'JobExperiance deleted',
          })
        })
        .catch(err => {
          res.status(500).json({
            statusCode: 500,
            status: false,
            message: 'Failed to delete JobExperiance',
            err
          })
        })
    })
  
  }
