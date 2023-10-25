"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var bidClassSchema = new Schema({
  creator: {
    type: String,
    trim: true
  },
  creator_id: {
    type: String,
    trim: true
  },
  classTitle: {
    type: String,
    trim: true
  },
  classCoverImg: {
    type: String,
    trim: true
  },
  classShortDes: {
    type: String,
    trim: true
  },
  classLongDes: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    trim: true
  },
  endDate: {
    type: Date,
    trim: true
  },
  bidItemList: {
    type: [String]
  },
  isDeleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});

var BidClass = _mongoose["default"].model("Gebis-BidClass", bidClassSchema);

var _default = BidClass;
exports["default"] = _default;