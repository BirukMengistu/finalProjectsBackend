
const { default: mongoose } = require('mongoose');
const Order = require('./orderSchema');

exports.getOrders = async (req, res) => {

  try {
    const data = await Product.find()
    res.status(200).json(data)
  } 
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: false,
      message: 'Something went wrong when fetching the order',
      err
    })
  }

}

exports.getOrderById = (req, res) => {

  Order.exists({ _id: req.params.id }, (err, order) => {

    if(err) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'You made a bad request',
      })
    }

    if(!order) {
      return res.status(404).json({
        statusCode: 404,
        status: false,
        message: 'Ooops, this order does not exist',
      })
    }


    Order.findById(req.params.id)
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


exports.createOrder = (req, res) => {

  Order.exists({ name: req.body.name }, (err, result) => {

    if(err) {
      return res.status(500).json(err)
    }

    if(result) {
      return res.status(400).json({
        statusCode: 400,
        status: false,
        message: 'A product by that name already exists, please update product instead'
      })
    }
  

   
    // newOrder

    Order.create({
      quantity:req.body.quantity,
      product:req.body.product_Id,
      user:req.body.user_Id
    })
    .then(data => {
      res.status(201).json({
        statusCode: 201,
        status: true,
        message: 'order created successfully',
        data
      })
    })
    .catch(err => {
      res.status(500).json({
        statusCode: 500,
        status: false,
        message: 'Failed to create order',
        err
      })
    })
  })

}


exports.updateOrder = (req, res) => {

  Order.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this order does not exist',
      })
    }

    Order.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then(data => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'order updated successfully',
          data
        })
      })
      .catch(err => {

        if(err.code === 11000) {
          return res.status(400).json({
            statusCode: 400,
            status: false,
            message: 'A order with that name already exists',
            err
          })
        }

        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to update product',
          err
        })

      })
  })

}



exports.deleteProduct = (req, res) => {

  Product.exists({ _id: req.params.id }, (err, result) => {

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
        message: 'Ooops, this order does not exist',
      })
    }


    Product.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({
          statusCode: 200,
          status: true,
          message: 'order deleted',
        })
      })
      .catch(err => {
        res.status(500).json({
          statusCode: 500,
          status: false,
          message: 'Failed to delete order',
          err
        })
      })
  })

}