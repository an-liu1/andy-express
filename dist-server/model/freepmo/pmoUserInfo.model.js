"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var pmoUserInfoSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  user_id: {
    type: String
  },
  avatar: {
    type: String,
    "default": "default_avatar.png"
  },
  email: {
    type: String
  }
}, {
  timestamps: true
});

var pmoUserInfo = _mongoose["default"].model("pmoUserInfo", pmoUserInfoSchema);

var _default = pmoUserInfo;
exports["default"] = _default;