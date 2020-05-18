"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var aftersaleSchema = new Schema({
  username: {
    type: String,
    trim: true
  },
  user_id: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  //客户提交售后
  order_id: {
    type: String
  },
  aftersale_type: {
    type: String
  },
  aftersale_title: {
    type: String,
    trim: true
  },
  aftersale_content: {
    type: String,
    trim: true
  },
  aftersale_image: {
    type: Array
  },
  // 客服给出解决方案及金额赔偿
  compensation: {
    type: String,
    trim: true
  },
  solution: {
    type: String,
    trim: true
  },
  aftersaleOperator: {
    type: String
  },
  // 售后操作员
  // 客户关闭售后
  is_solve: {
    type: Boolean
  }
}, {
  timestamps: true
});

var AfterSale = _mongoose["default"].model("Express-AfterSale", aftersaleSchema);

var _default = AfterSale;
exports["default"] = _default;