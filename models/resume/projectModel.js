const { exists } = require('./projectSchema');
const Project = require('./projectSchema');

exports.getProject = async (req, res) => {

  try {
    const data = await Project.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Something went wrong when fetching the Projects',
      err
    })
  }

}

exports.getProjectById = (req, res) => {

  Project.exists({ _id: req.params.id }, (err, Project) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!Project) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this Project does not exist',
      })
    }


    Project.findById(req.params.id)
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


exports.createProject = (req, res) => {

  Project.exists({_id: req.params.id }, (err, result) => {

    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'A Project by that userId already exists, please update Project instead'
      })
    }


   
   
    // const newProject = new Resume({})
    // newProject.save()

    Project.create({
       project_title:   req.body.project_title,
       summary:  req.body.summary,
       my_role:  req.body.my_role,
       startedAt:  req.body.startedAt,
       endedAt:  req.body.endedAt,
       userId:  req.body.userId,
    })
    .then(data => {
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: 'Project created successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Failed to create Project',
        err
      })
    })
  })

}


exports.updateProject = (req, res) => {

    Project.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this Project does not exist',
      })
    }

    Project.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Project updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A Project with that name already exists',
            err
          })
        }

        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to update Project',
          err
        })

      })
  })

}



exports.deleteProject = (req, res) => {

    Project.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this Project does not exist',
      })
    }


    Project.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Project deleted',
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to delete Project',
          err
        })
      })
  })

}