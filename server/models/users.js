const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const Users = new Scheme({
  username :{type: String, maxLength: 255},
  password: {type: String},
  email : {type: String},
  name: {type : String},
  avatar: {type: String},
  phone : {type: String},
  address: {type: String}
}, {
    timestamps: true
})

module.exports = mongoose.model('user', Users);