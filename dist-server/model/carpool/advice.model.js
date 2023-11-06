"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var adviceSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
  user_id: {
    type: String,
    trim: true
  },
  avatarUrl: {
    type: String
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  adminReply: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

var advice = _mongoose["default"].model("Carpool-advice", adviceSchema);

var _default = advice;
exports["default"] = _default;