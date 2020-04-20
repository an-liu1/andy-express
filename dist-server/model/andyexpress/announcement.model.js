"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var announcementSchema = new Schema({
  title: {
    type: String
  },
  type: {
    type: String
  },
  content: {
    type: String
  },
  importance: {
    type: Number
  },
  summary: {
    type: String
  }
}, {
  timestamps: true
});

var Announcement = _mongoose["default"].model("Express-Announcement", announcementSchema);

var _default = Announcement;
exports["default"] = _default;