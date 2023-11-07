"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _keys = _interopRequireDefault(require("../../config/keys"));

var _user = _interopRequireDefault(require("../../model/gebis/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userController = {};

userController.getOpenId = function (req, res) {
  var code = req.body.code; //获取小程序传来的code

  var appid = "wx2379b7a9cc8f038c"; //自己小程序后台管理的appid，可登录小程序后台查看

  var secret = "9c6f1b98c538dd4303c7c30110fea462"; //小程序后台管理的secret，可登录小程序后台查看

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

        if (!user) {
          _user["default"].create(req.body).then(function (user1) {
            var rule = {
              id: user1._id,
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
                token: "Bearer " + token,
                data: user1
              });
            });
          });
        } else {
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
              token: "Bearer " + token,
              data: user
            });
          });
        }
      });
    }).on("error", function (e) {
      console.error(e);
    });
  });
};

userController.getUserInfo = function (req, res) {
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

userController.updateUserInfo = function (req, res) {
  _user["default"].findOneAndUpdate({
    _id: req.user.id
  }, {
    $set: req.body
  }).then(function (userInfo) {
    return res.json({
      success: true,
      code: 0,
      data: userInfo
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

userController.collectBidItem = function (req, res) {
  _user["default"].find({
    _id: req.user.id
  }).then(function (userInfo1) {
    var collectedBidItem = userInfo1[0].collected_bidItem;

    if (collectedBidItem && collectedBidItem.length > 0) {
      if (collectedBidItem.filter(function (i) {
        return i == req.body.collect_id;
      }).length > 0) {
        collectedBidItem = collectedBidItem.filter(function (i) {
          return i !== req.body.collect_id;
        });
      } else {
        collectedBidItem = collectedBidItem.concat(req.body.collect_id);
      }
    } else {
      collectedBidItem = [req.body.collect_id];
    }

    _user["default"].findOneAndUpdate({
      _id: req.user.id
    }, {
      $set: {
        collected_bidItem: collectedBidItem
      }
    }).then(function () {
      _user["default"].find({
        _id: req.user.id
      }).then(function (userInfo) {
        return res.json({
          success: true,
          code: 0,
          data: userInfo[0]
        });
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = userController;
exports["default"] = _default;