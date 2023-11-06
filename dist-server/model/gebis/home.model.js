"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var homeSchema = new Schema({
  noticeBarText: {
    type: String,
    trim: true
  },
  banner: {
    type: String,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});

var Home = _mongoose["default"].model("Gebis-Home", homeSchema);

var _default = Home;
exports["default"] = _default;