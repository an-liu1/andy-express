"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  code: {
    type: String,
    trim: true
  },
  openid: {
    type: String,
    trim: true
  },
  sessionKey: {
    type: String,
    trim: true
  },
  last_login_time: {
    type: Date
  },
  isUserExist: {
    type: Boolean,
    "default": false
  },
  isAdmin: {
    type: Boolean,
    "default": false
  },
  collected_bidItem: {
    type: [String]
  }
}, {
  timestamps: true
});

var User = _mongoose["default"].model("Gebis-User", userSchema);

var _default = User;
exports["default"] = _default;