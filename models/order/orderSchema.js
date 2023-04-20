const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  
  user:{ type:mongoose.Schema.Types.ObjectId , ref:'user', require:true},
  product:{type:mongoose.Schema.Types.ObjectId, ref:'Product' ,require:true},
  Quantity: { type: Number, default: 1 },
 

}, { timestamps: true })


module.exports = mongoose.model('Order', orderSchema )