"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _announcement = _interopRequireDefault(require("../../model/andyexpress/announcement.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var announcementController = {}; // 创建公告

announcementController.createAnnouncement = function (req, res) {
  _announcement["default"].create(req.body).then(function (announcement) {
    return res.json({
      success: true,
      code: 0,
      data: announcement
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; //公告修改


announcementController.updateAnnouncement = function (req, res) {
  _announcement["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (announcement) {
    return res.json({
      success: true,
      code: 0,
      data: announcement
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 后台所有公告


announcementController.getAdminAnnouncement = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _announcement["default"].find().skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (announcement) {
    return res.json({
      success: true,
      code: 0,
      data: announcement
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 后台具体某条公告


announcementController.getAAnnouncement = function (req, res) {
  _announcement["default"].find({
    _id: req.params.id
  }).then(function (announcement) {
    return res.json({
      success: true,
      code: 0,
      data: announcement
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

announcementController.deleteAnnouncement = function (req, res) {
  _announcement["default"].findByIdAndDelete(req.params.id).then(function (announcement) {
    return res.json({
      success: true,
      code: 0,
      data: announcement
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = announcementController;
exports["default"] = _default;