"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _pmoUserInfo = _interopRequireDefault(require("../../model/freepmo/pmoUserInfo.model"));

var _user = _interopRequireDefault(require("../../model/user.model"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pmoUserInfoController = {};

pmoUserInfoController.getUserInfo = function (req, res) {
  _pmoUserInfo["default"].find({
    user_id: req.user.id
  }).then(function (user) {
    res.json({
      data: user,
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    res.status(400).json("Error: " + err);
  });
};

pmoUserInfoController.updateUserInfo = function (req, res) {
  _pmoUserInfo["default"].updateOne({
    _id: req.body._id
  }, req.body).then(function () {
    _bcryptjs["default"].genSalt(10, function (err, salt) {
      _bcryptjs["default"].hash(req.body.password, salt, function (err, hash) {
        if (err) {
          throw err;
        }

        req.body.password = hash;

        _user["default"].updateOne({
          _id: req.body.user_id
        }, {
          password: hash
        }).then(function () {
          return res.json({
            success: true,
            code: 0
          });
        })["catch"](function (err) {
          return res.status(400).json("Error: " + err);
        });
      });
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

pmoUserInfoController.avatarUpload = function (req, res) {
  var avatar = req.body.avatar;
  var base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = Buffer.from(base64Data, "base64");
  var time = Date.now();
  var imagePath = "images/freepmo/avatar/".concat(req.user.id, "-").concat(time, ".png");

  _fs["default"].writeFile("./public/".concat(imagePath), dataBuffer, function (err) {
    if (err) return;
  });

  _pmoUserInfo["default"].updateOne({
    user_id: req.user.id
  }, {
    avatar: imagePath
  }).then(function () {
    return res.json({
      success: true,
      code: 0
    });
  });
};

var _default = pmoUserInfoController;
exports["default"] = _default;