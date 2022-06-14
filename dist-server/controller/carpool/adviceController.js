"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _advice = _interopRequireDefault(require("../../model/carpool/advice.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var adviceController = {};

adviceController.createNewAdvice = function (req, res) {
  req.body.username = req.user.username;
  req.body.user_id = req.user.id;

  _advice["default"].create(req.body).then(function (advice) {
    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

adviceController.getMyAdvice = function (req, res) {
  _advice["default"].find({
    user_id: req.user.id
  }).sort({
    updatedAt: "desc"
  }).then(function (advice) {
    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

adviceController.getAllAdvice = function (req, res) {
  _advice["default"].find().sort({
    updatedAt: "desc"
  }).then(function (advice) {
    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

adviceController.adminReplyAdvice = function (req, res) {
  _advice["default"].findupdateOne({
    _id: req.body.id
  }, {
    $set: {
      adminReply: req.body.adminReply
    }
  }).then(function (advice) {
    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = adviceController;
exports["default"] = _default;