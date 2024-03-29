"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var carpoolInfoListSchema = new Schema({
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
  fromCity: {
    type: String,
    required: true,
    trim: true
  },
  toCity: {
    type: String,
    required: true,
    trim: true
  },
  carpoolTime: {
    type: Date,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  wholePrice: {
    type: Number,
    trim: true
  },
  seatNumb: {
    type: Number,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  contact: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  weixin: {
    type: String,
    trim: true
  },
  stickTop: {
    type: Boolean,
    "default": false
  },
  endTrip: {
    type: Boolean,
    "default": false
  },
  last_update_time: {
    type: Date
  }
}, {
  timestamps: true
});

var CarpoolInfoList = _mongoose["default"].model("Carpool-CarpoolInfoList", carpoolInfoListSchema);

var _default = CarpoolInfoList;
exports["default"] = _default;