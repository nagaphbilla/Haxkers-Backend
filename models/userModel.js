const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  center : {
    type : {},
    required : true,
  },
  radius : {
    type : Number,
    required : true,
  },
  role : {
    type : String,
    required : true,
  },
},
  {timestamps : true}
)

module.exports = mongoose.model('User', UserSchema);