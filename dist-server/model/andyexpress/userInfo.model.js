"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var userInfoSchema = new Schema({
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
  },
  last_login_time: {
    type: Date
  },
  level: {
    type: String
  },
  address: [{
    ShippingCountry: {
      type: String
    },
    ShippingProvince: {
      type: String
    },
    ShippingCity: {
      type: String
    },
    ShippingAddress: {
      type: String
    },
    ShippingPostcode: {
      type: String
    },
    shippingPhone: {
      type: String
    },
    shippingRecevier: {
      type: String
    }
  }],
  birthday: {
    type: Date
  },
  phoneNumber: {
    type: String
  },
  gender: {
    type: String
  },
  weixin: {
    type: String
  },
  qq: {
    type: String
  },
  //余额
  balance: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});

var UserInfo = _mongoose["default"].model("Express-UserInfo", userInfoSchema);

var _default = UserInfo;
exports["default"] = _default;