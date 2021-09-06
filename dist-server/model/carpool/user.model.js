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
    trim: true
  },
  avatar: {
    type: String
  },
  gender: {
    type: Number
  },
  openid: {
    type: String,
    required: true,
    trim: true
  },
  sessionKey: {
    type: String,
    required: true,
    trim: true
  },
  last_login_time: {
    type: Date
  },
  saved_carpool: {
    type: [String]
  }
}, {
  timestamps: true
});

var User = _mongoose["default"].model("Carpool-User", userSchema);

var _default = User;
exports["default"] = _default;