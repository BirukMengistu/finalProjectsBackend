
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    userId:String,
    image:String,
    gender: String,
    email: String,
    age: String,
    address: String,
    telephone: String,
    role:String,
    firstName:      String,
    lastName:       String,
    completed:Boolean

}, { timestamps: true })


module.exports = mongoose.model('Profile', profileSchema)