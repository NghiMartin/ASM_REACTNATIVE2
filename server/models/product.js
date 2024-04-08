const mongoose = require('mongoose');

const Product = new mongoose.Schema({
  productType: {
    type: String,
    required: true,
  },
  detailType: {
    type: String
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Product', Product);
