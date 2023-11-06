"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var appOpenSchema = new Schema({
  beOpenedTimes: {
    type: Number,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

var appOpen = _mongoose["default"].model("Carpool-appOpen", appOpenSchema);

var _default = appOpen;
exports["default"] = _default;