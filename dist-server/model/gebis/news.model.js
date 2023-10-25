"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var newsSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  subTitle: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  banner: {
    type: String,
    trim: true
  },
  content: {
    type: [String]
  },
  creator: {
    type: String,
    trim: true
  },
  creator_id: {
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

var News = _mongoose["default"].model("Gebis-News", newsSchema);

var _default = News;
exports["default"] = _default;