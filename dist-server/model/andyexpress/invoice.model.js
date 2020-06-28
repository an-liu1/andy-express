"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Schema = _mongoose["default"].Schema;
var invoiceSchema = new Schema({
  username: {
    type: String
  },
  user_id: {
    type: String
  },
  operator: {
    type: String
  },
  exportDate: {
    type: String
  },
  senderCompanyName: {
    type: String
  },
  exportCountry: {
    type: String
  },
  senderAddress: {
    type: String
  },
  senderName: {
    type: String
  },
  senderTel: {
    type: String
  },
  receiverCompanyName: {
    type: String
  },
  receiverAddress: {
    type: String
  },
  receiverZipcode: {
    type: String
  },
  importCountry: {
    type: String
  },
  receiverName: {
    type: String
  },
  receiverTel: {
    type: String
  },
  goods: [{
    goodName: {
      type: String
    },
    goodNumber: {
      type: Number
    },
    goodPrice: {
      type: String
    },
    hsCode: {
      type: String
    },
    totalPrice: {
      type: String
    }
  }],
  totalPrice: {
    type: String
  }
}, {
  timestamps: true
});

var Invoice = _mongoose["default"].model("Express-Invoice", invoiceSchema);

var _default = Invoice;
exports["default"] = _default;