const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const userSchema = mongoose.Schema({
  userId:         { type: String, required: true, default:nanoid(4), index: { unique: true },},
  firstName:      { type: String, required: true },
  lastName:       { type: String, required: true },
  email:          { type: String, required: true, unique: true },
  roles: {
    type: [String],
    enum: ["user", "admin"],
    default: ["user"],
},
  passwordHash:   { type: String, required: true },

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);