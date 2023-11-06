"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  weixin: {
    type: String,
    unique: true,
    trim: true
  },
  code: {
    type: String
  },
  islive: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;