const mongoose = require('mongoose');

const Cart = new mongoose.Schema({
  idUser: {
    type: String,
    require: true
  },
  idProduct: {
    type: String,
    require: true
  },
  quantity: {
    type: Number
  },
  price: {
    type: Number
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Cart', Cart);
