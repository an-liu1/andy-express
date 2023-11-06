"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../../model/user.model"));

var _pmoUserInfo = _interopRequireDefault(require("../../model/freepmo/pmoUserInfo.model"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _keys = _interopRequireDefault(require("../../config/keys"));

var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authController = {};

authController.userRegister = function (req, res) {
  _user["default"].findOne({
    email: req.body.email
  }).then(function (user) {
    if (user) {
      return res.status(400).json("用户邮箱已存在!");
    } else {
      _bcryptjs["default"].genSalt(10, function (err, salt) {
        _bcryptjs["default"].hash(req.body.password, salt, function (err, hash) {
          if (err) {
            throw err;
          }

          req.body.password = hash;
          req.body.code = Math.abs(Math.random().toString().split("").reduce(function (p, c) {
            return (p << 5) - p + c;
          })).toString(36).substr(0, 8);

          _user["default"].create(req.body).then(function (user) {
            (0, _sendEmail["default"])({
              from: "freePMO <yvetteandyadmin@163.com>",
              to: req.body.email,
              subject: "[freePMO]激活邮箱账号",
              text: "\u5C0A\u656C\u7684".concat(user.username, "\uFF0C\u60A8\u597D\uFF01\u70B9\u51FB\u94FE\u63A5\u5373\u53EF\u6FC0\u6D3B\u60A8\u7684freePMO\u8D26\u53F7, http://andy-express.herokuapp.com/freepmo/checkCode/").concat(user.email, "/").concat(user.code, " \u4E3A\u4FDD\u969C\u60A8\u7684\u5E10\u53F7\u5B89\u5168\uFF0C\u8BF7\u572824\u5C0F\u65F6\u5185\u70B9\u51FB\u8BE5\u94FE\u63A5\uFF0C\u60A8\u4E5F\u53EF\u4EE5\u5C06\u94FE\u63A5\u590D\u5236\u5230\u6D4F\u89C8\u5668\u5730\u5740\u680F\u8BBF\u95EE\u3002 \u82E5\u5982\u679C\u5E76\u6CA1\u60A8\u7684\u64CD\u4F5C\uFF0C\u8BF7\u5FFD\u7565\u672C\u90AE\u4EF6\uFF0C\u7531\u6B64\u7ED9\u60A8\u5E26\u6765\u7684\u4E0D\u4FBF\u8BF7\u8C05\u89E3\u3002\u672C\u90AE\u4EF6\u7531\u7CFB\u7EDF\u81EA\u52A8\u53D1\u51FA\uFF0C\u8BF7\u52FF\u76F4\u63A5\u56DE\u590D\uFF01")
            });
            return res.json({
              success: true,
              code: 0,
              data: user
            });
          })["catch"](function (err) {
            return res.status(400).json("Error: " + err);
          });
        });
      });
    }
  });
};

authController.checkCode = function (req, res) {
  var email = req.params.email;
  var code = req.params.code;

  _user["default"].findOne({
    email: email
  }).then(function (user) {
    if (user.code === code && Date.now() - Date.parse(user.createdAt) < 864000000) {
      _user["default"].findOneAndUpdate({
        email: email
      }, {
        islive: true
      }, {
        "new": true
      }).then(function () {
        res.redirect("http://freepmo.andyliu.ca/#/login");
        res.end();
      })["catch"](function (err) {
        return res.status(400).json("Error: " + err);
      });
    }
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

authController.userLogin = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  _user["default"].findOne({
    email: email
  }).then(function (user) {
    if (!user) {
      return res.status(400).json("用户名不存在!");
    } else {
      _bcryptjs["default"].compare(password, user.password).then(function (isMatch) {
        if (isMatch) {
          var rule = {
            id: user._id,
            username: user.username
          };

          _jsonwebtoken["default"].sign(rule, _keys["default"].secretOrkey, {
            expiresIn: 36000
          }, function (err, token) {
            if (err) {
              throw err;
            }

            if (!user.islive) {
              return res.status(400).json("请先激活用户再登录");
            }

            _pmoUserInfo["default"].findOne({
              user_id: user._id
            }).then(function (userExisted) {
              if (!userExisted) {
                _pmoUserInfo["default"].create({
                  user_id: user._id,
                  username: user.username,
                  email: user.email,
                  weixin: user.weixin
                });
              }

              res.json({
                id: user._id,
                success: true,
                code: 0,
                token: "Bearer " + token
              });
            })["catch"](function (err) {
              return res.status(400).json("Error: " + err);
            });
          });
        } else {
          return res.status(400).json("密码错误!");
        }
      });
    }
  });
};

authController.requestReset = function (req, res) {
  _user["default"].findOne({
    email: req.body.email
  }).then(function (user) {
    if (user) {
      (0, _sendEmail["default"])({
        from: "freePMO <freePMO.admin@freepmo.andyliu.ca>",
        to: req.body.email,
        subject: "[freePMO]账号密码重置命令，请求激活",
        text: "\u5C0A\u656C\u7684".concat(user.username, "\uFF0C\u60A8\u597D\uFF01\u70B9\u51FB\u94FE\u63A5\u5373\u53EF\u8DF3\u8F6C\u81F3\u5BC6\u7801\u91CD\u7F6E\u754C\u9762, http://freepmo.andyliu.ca/resetpassword/").concat(user.email, "/").concat(user.code, "/true \u4E3A\u4FDD\u969C\u60A8\u7684\u5E10\u53F7\u5B89\u5168\uFF0C\u8BF7\u572824\u5C0F\u65F6\u5185\u70B9\u51FB\u8BE5\u94FE\u63A5\uFF0C\u60A8\u4E5F\u53EF\u4EE5\u5C06\u94FE\u63A5\u590D\u5236\u5230\u6D4F\u89C8\u5668\u5730\u5740\u680F\u8BBF\u95EE\u3002 \u82E5\u5982\u679C\u5E76\u6CA1\u60A8\u7684\u64CD\u4F5C\uFF0C\u8BF7\u5FFD\u7565\u672C\u90AE\u4EF6\uFF0C\u7531\u6B64\u7ED9\u60A8\u5E26\u6765\u7684\u4E0D\u4FBF\u8BF7\u8C05\u89E3\u3002\u672C\u90AE\u4EF6\u7531\u7CFB\u7EDF\u81EA\u52A8\u53D1\u51FA\uFF0C\u8BF7\u52FF\u76F4\u63A5\u56DE\u590D\uFF01")
      });
      return res.json({
        success: true,
        code: 0
      });
    } else {
      return res.status(400).json("此用户不存在, 请输入正确的邮箱账户！");
    }
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

authController.resetPassword = function (req, res) {
  _bcryptjs["default"].genSalt(10, function (err, salt) {
    _bcryptjs["default"].hash(req.body.password, salt, function (err, hash) {
      if (err) {
        throw err;
      }

      var password = hash;

      _user["default"].findOneAndUpdate({
        email: req.body.email
      }, {
        password: password
      }, {
        "new": true
      }).then(function () {
        return res.json({
          success: true,
          code: 0
        });
      });
    });
  });
};

var _default = authController;
exports["default"] = _default;