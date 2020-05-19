"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userInfo = _interopRequireDefault(require("../../model/andyexpress/userInfo.model"));

var _orderForm = _interopRequireDefault(require("../../model/andyexpress/orderForm.model"));

var _goods = _interopRequireDefault(require("../../model/andyexpress/goods.model"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import moment from "moment";
var dataController = {}; // 具体投诉详情

dataController.getDataAnalysis = function (req, res) {
  //   let today = moment().tz("Asia/Shanghai").format("MMDD");
  var today = req.body.today;
  var activeUser0 = [];
  var activeUser1 = [];
  var activeUser2 = [];
  var activeUser3 = [];
  var activeUser4 = [];
  var activeUser5 = [];
  var activeUser6 = [];
  var activeUsers;
  var newUser0 = [];
  var newUser1 = [];
  var newUser2 = [];
  var newUser3 = [];
  var newUser4 = [];
  var newUser5 = [];
  var newUser6 = [];
  var newUsers;
  var newOrder0 = [];
  var newOrder1 = [];
  var newOrder2 = [];
  var newOrder3 = [];
  var newOrder4 = [];
  var newOrder5 = [];
  var newOrder6 = [];
  var newOrders;

  _userInfo["default"].find().then(function (users) {
    users.map(function (i) {
      if (parseInt((0, _momentTimezone["default"])(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today)) {
        activeUser0.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 1)) {
        activeUser1.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 2)) {
        activeUser2.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 3)) {
        activeUser3.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 4)) {
        activeUser4.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 5)) {
        activeUser5.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 6)) {
        activeUser6.push(i.user_id);
      }

      if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today)) {
        newUser0.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 1)) {
        newUser1.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 2)) {
        newUser2.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 3)) {
        newUser3.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 4)) {
        newUser4.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 5)) {
        newUser5.push(i.user_id);
      } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 6)) {
        newUser6.push(i.user_id);
      }
    });
    activeUsers = [activeUser0.length, activeUser1.length, activeUser2.length, activeUser3.length, activeUser4.length, activeUser5.length, activeUser6.length].reverse();
    newUsers = [newUser0.length, newUser1.length, newUser2.length, newUser3.length, newUser4.length, newUser5.length, newUser6.length].reverse();

    _orderForm["default"].find().then(function (orders) {
      orders.map(function (i) {
        if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today)) {
          newOrder0.push(i.user_id);
        } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 1)) {
          newOrder1.push(i.user_id);
        } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 2)) {
          newOrder2.push(i.user_id);
        } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 3)) {
          newOrder3.push(i.user_id);
        } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 4)) {
          newOrder4.push(i.user_id);
        } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 5)) {
          newOrder5.push(i.user_id);
        } else if (parseInt((0, _momentTimezone["default"])(i.createdAt).tz("Asia/Shanghai").format("MMDD")) === parseInt(today - 6)) {
          newOrder6.push(i.user_id);
        }
      });
      newOrders = [newOrder0.length, newOrder1.length, newOrder2.length, newOrder3.length, newOrder4.length, newOrder5.length, newOrder6.length].reverse();
      return res.json({
        success: true,
        code: 0,
        data: {
          activeUser: activeUsers,
          newUser: newUsers,
          newOrder: newOrders
        }
      });
    });
  });
};

var _default = dataController;
exports["default"] = _default;