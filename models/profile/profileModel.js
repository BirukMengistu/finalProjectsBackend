const { exists } = require('./profileSchema');
const Profile = require('./profileSchema');

exports.getProfiles = async (req, res) => {

  try {
    const data = await Profile.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Something went wrong when fetching the Profiles',
      err
    })
  }

}

exports.getProfileById = (req, res) => {

  Profile.exists({ _id: req.params.id }, (err, Profile) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!Profile) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this Profile does not exist',
      })
    }


    Profile.findById(req.params.id)
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


exports.createProfile = (req, res) => {

  Profile.exists({ userId: req.body.userId }, (err, result) => {

    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'A Profile by that userId already exists, please update Profile instead'
      })
    }

   
   
    // const newProfile = new Profile({})
    // newProfile.save()

   
    Profile.create({
      userId:   req.body.userId,
      gender:  req.body.gender,
      email:  req.body.email,
      address:   req.body.address,
      telephone:  req.body.telephone,
      role:  req.body.role,
      completed:req.body.completed

     
    })
    .then(data => {
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: 'Profile created successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Failed to create Profile',
        err
      })
    })
  })

}


exports.updateProfile = (req, res) => {

  Profile.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this Profile does not exist',
      })
    }

    Profile.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'Profile updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A Profile with that name already exists',
            err
          })
        }

        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to update Profile',
          err
        })

      })
  })

}



exports.deleteProfile = (req, res) => {

  Profile.exists({ _id: req.params.id }, (err, result) => {

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


    Profile.deleteOne({ _id: req.params.id })
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
          message: 'Failed to delete Profile',
          err
        })
      })
  })

}