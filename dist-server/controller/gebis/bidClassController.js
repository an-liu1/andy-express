"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bidClass = _interopRequireDefault(require("../../model/gebis/bidClass.model"));

var _bidItems = _interopRequireDefault(require("../../model/gebis/bidItems.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var bidClassController = {};

bidClassController.getBidClassList = function (req, res) {
  _bidClass["default"].find({
    isDeleted: false
  }).sort({
    updatedAt: "desc"
  }).then(function (bidClass) {
    return res.json({
      success: true,
      code: 0,
      data: bidClass
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidClassController.createBidClass = function (req, res) {
  req.body.creator = req.user.name;
  req.body.creator_id = req.user.id;

  _bidClass["default"].create(req.body).then(function () {
    return res.json({
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidClassController.getAllBidClass = function (req, res) {
  _bidClass["default"].find().sort({
    isDeleted: "asc"
  }).sort({
    updatedAt: "desc"
  }).then(function (bidClass) {
    return res.json({
      success: true,
      code: 0,
      data: bidClass
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidClassController.deleteBidClass = function (req, res) {
  _bidClass["default"].findOneAndUpdate({
    _id: req.body.id
  }, {
    $set: {
      isDeleted: req.body.isDeleted
    }
  }).then(function () {
    _bidItems["default"].updateMany({
      class_id: {
        $in: [req.body.id]
      }
    }, {
      $set: {
        isDeleted: req.body.isDeleted
      }
    }).then(function () {
      return res.json({
        success: true,
        code: 0
      });
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidClassController.getBidClass = function (req, res) {
  _bidClass["default"].find({
    _id: req.params.id
  }).then(function (bidClass) {
    return res.json({
      success: true,
      code: 0,
      data: bidClass[0]
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidClassController.updateBidClass = function (req, res) {
  _bidClass["default"].findOneAndUpdate({
    _id: req.body._id
  }, {
    $set: req.body
  }).then(function () {
    return res.json({
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = bidClassController;
exports["default"] = _default;