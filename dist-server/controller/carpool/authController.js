"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _keys = _interopRequireDefault(require("../../config/keys"));

var _user = _interopRequireDefault(require("../../model/carpool/user.model"));

var _carpoolInfoList = _interopRequireDefault(require("../../model/carpool/carpoolInfoList.model"));

var _appOpen = _interopRequireDefault(require("../../model/carpool/appOpen.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authController = {};

authController.setAPPOpenTimes = function (req, res) {
  _appOpen["default"].find().then(function (appOpenTimes) {
    var beOpenedTimes = appOpenTimes[0].beOpenedTimes + 1;

    _appOpen["default"].updateOne({
      $set: {
        beOpenedTimes: beOpenedTimes
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

authController.getOpenId = function (req, res) {
  var code = req.body.code; //获取小程序传来的code

  var appid = "wxa438f6a5e945514b"; //自己小程序后台管理的appid，可登录小程序后台查看

  var secret = "21c50b79b63d02f1702d0d4c009d6673"; //小程序后台管理的secret，可登录小程序后台查看

  var grant_type = "authorization_code"; // 授权（必填）默认值

  var url = "https://api.weixin.qq.com/sns/jscode2session?grant_type=" + grant_type + "&appid=" + appid + "&secret=" + secret + "&js_code=" + code;

  var https = require("https");

  https.get(url, function (resp) {
    var openid, sessionKey;
    resp.on("data", function (d) {
      openid = JSON.parse(d).openid; //得到openid

      sessionKey = JSON.parse(d).session_key; //得到session_key

      _user["default"].findOne({
        openid: openid
      }).then(function (user) {
        req.body.last_login_time = new Date();
        req.body.openid = openid;
        req.body.sessionKey = sessionKey;
        req.body.username = req.body.nickName;

        if (!user) {
          _user["default"].create(req.body);
        } else {
          _user["default"].updateOne({
            _id: user._id
          }, {
            $set: req.body
          }).then(function () {
            var rule = {
              id: user._id,
              openid: openid,
              sessionKey: sessionKey
            };

            _jsonwebtoken["default"].sign(rule, _keys["default"].secretOrkey, {
              expiresIn: 36000
            }, function (err, token) {
              if (err) {
                throw err;
              }

              return res.json({
                success: true,
                code: 0,
                data: {
                  token: "Bearer " + token
                }
              });
            });
          });
        }
      });
    }).on("error", function (e) {
      console.error(e);
    });
  });
};

authController.getAPPStatistics = function (req, res) {
  _user["default"].find().then(function (userInfo) {
    _carpoolInfoList["default"].find().then(function (carpool) {
      _appOpen["default"].find().then(function (appOpenTimes) {
        return res.json({
          success: true,
          code: 0,
          data: {
            user: userInfo.length,
            carpool: carpool.length,
            appOpenTimes: appOpenTimes[0].beOpenedTimes
          }
        });
      });
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

authController.getUserInfo = function (req, res) {
  _user["default"].find({
    _id: req.user.id
  }).then(function (userInfo) {
    return res.json({
      success: true,
      code: 0,
      data: userInfo[0]
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = authController;
exports["default"] = _default;