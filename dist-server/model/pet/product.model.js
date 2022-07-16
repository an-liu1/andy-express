"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var productSchema = new Schema({
  productImg: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  displayName: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    trim: true
  },
  pet: {
    type: String,
    trim: true
  },
  flavour: {
    type: String,
    trim: true
  },
  "package": {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    trim: true
  },
  originPrice: {
    type: Number,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  productSizeAndPrice: [{
    size: {
      type: String,
      trim: true,
      "default": 0
    },
    price: {
      type: Number,
      trim: true,
      "default": 0
    }
  }]
}, {
  timestamps: true
});

var Product = _mongoose["default"].model("Pet-product", productSchema);

var _default = Product;
exports["default"] = _default;