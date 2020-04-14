"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var advicesSchema = new Schema({
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
  //客户提交投书
  advice_title: {
    type: String,
    trim: true
  },
  advice_content: {
    type: String,
    trim: true
  },
  evident_image: {
    type: Array
  }
}, {
  timestamps: true
});

var Advices = _mongoose["default"].model("Express-Advices", advicesSchema);

var _default = Advices;
exports["default"] = _default;