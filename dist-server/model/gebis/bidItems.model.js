"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var bidItemSchema = new Schema({
  title: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    trim: true
  },
  type: {
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
  donator: {
    type: String,
    trim: true
  },
  artist: {
    type: String,
    trim: true
  },
  bidImgCover: {
    type: String,
    trim: true
  },
  bidImgList: {
    type: [String]
  },
  startPrice: {
    type: Number,
    trim: true
  },
  appraisalPrice: {
    type: Number,
    trim: true
  },
  bidPriceHistory: [{
    buyer: {
      type: String,
      trim: true
    },
    price: {
      type: Number,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    buyerId: {
      type: String,
      trim: true
    },
    comfirmTime: {
      type: Date,
      trim: true
    }
  }],
  finalPrice: {
    type: Number,
    trim: true
  },
  finalBuyerId: {
    type: String,
    trim: true
  },
  finalBuyer: {
    type: String,
    trim: true
  },
  isDeleted: {
    type: Boolean,
    "default": false
  },
  creator: {
    type: String,
    trim: true
  },
  creator_id: {
    type: String,
    trim: true
  },
  class_id: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

var BidItem = _mongoose["default"].model("Gebis-BidItem", bidItemSchema);

var _default = BidItem;
exports["default"] = _default;