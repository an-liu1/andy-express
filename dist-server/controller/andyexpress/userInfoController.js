"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userInfo = _interopRequireDefault(require("../../model/andyexpress/userInfo.model"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userInfoController = {}; // 获取用户信息

userInfoController.getUserInfo = function (req, res) {
  _userInfo["default"].find({
    user_id: req.user.id
  }).then(function (user) {
    res.json({
      success: true,
      code: 0,
      data: user
    });
  })["catch"](function (err) {
    res.status(400).json("Error: " + err);
  });
}; // 用户信息更改


userInfoController.updateUserInfo = function (req, res) {
  _userInfo["default"].updateOne({
    user_id: req.user.id
  }, req.body).then(function (user) {
    return res.json({
      success: true,
      code: 0,
      data: user
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 头像上传


userInfoController.avatarUpload = function (req, res) {
  var avatar = req.body.avatar;
  var base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = Buffer.from(base64Data, "base64");
  var time = Date.now();

  _fs["default"].mkdir("./public/images/andyexpress/avatar", function (e) {
    return e;
  });

  var imagePath = "images/andyexpress/avatar/".concat(req.user.id, "_").concat(time, ".png");

  _fs["default"].writeFile("./public/".concat(imagePath), dataBuffer);

  _userInfo["default"].updateOne({
    user_id: req.user.id
  }, {
    avatar: imagePath
  }).then(function (user) {
    return res.json({
      success: true,
      code: 0,
      data: user
    });
  });
}; // 后台获取所有用户


userInfoController.getAllUser = function (req, res) {
  _userInfo["default"].find().then(function (user) {
    return res.json({
      data: user,
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = userInfoController;
exports["default"] = _default;