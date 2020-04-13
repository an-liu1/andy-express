"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var minderSchema = new Schema({
  goal: {
    data: {
      text: String,
      id: String
    },
    children: [{
      data: {},
      children: Array
    }]
  },
  stakehold: {
    data: {
      text: String,
      id: String
    },
    children: [{
      data: {},
      children: Array
    }]
  },
  task: {
    data: {
      text: String,
      id: String
    },
    children: [{
      data: {},
      children: Array
    }]
  },
  plan: {
    tasks: {
      data: [{
        id: String,
        text: String,
        start_date: Date,
        end_date: Date,
        duration: Number,
        progress: String,
        parent: String
      }],
      links: Array // [
      //   {
      //     id: Number,
      //     source: String,
      //     target: String,
      //     type: String
      //   }
      // ]

    },
    messages: []
  },
  userId: {
    type: String,
    trim: true
  },
  projectName: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    trim: true
  }
});

var Minder = _mongoose["default"].model("Minder", minderSchema);

var _default = Minder;
exports["default"] = _default;