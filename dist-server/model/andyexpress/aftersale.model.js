"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var aftersaleSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
  user_id: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  aftersale_title: {
    type: String,
    trim: true
  },
  aftersale_content: {
    type: String,
    trim: true
  },
  aftersale_image: {
    type: Array
  },
  is_solve: {
    type: Boolean
  },
  compensation: {
    type: String,
    trim: true
  },
  solution: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

var AfterSale = _mongoose["default"].model("Express-AfterSale", aftersaleSchema);

var _default = AfterSale;
exports["default"] = _default;