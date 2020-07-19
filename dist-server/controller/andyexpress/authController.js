"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _user = _interopRequireDefault(require("../../model/user.model"));

var _userInfo = _interopRequireDefault(require("../../model/andyexpress/userInfo.model"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _keys = _interopRequireDefault(require("../../config/keys"));

var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));

var _announcement = _interopRequireDefault(require("../../model/andyexpress/announcement.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authController = {};

authController.userRegister = function (req, res) {
  _user["default"].find({
    $or: [{
      email: req.body.email
    }, {
      username: req.body.username
    }]
  }).then(function (user) {
    if (user.length !== 0) {
      return res.status(400).json("用户名或用户邮箱已存在，请重新输入!");
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
            var getEmailContent = function getEmailContent(emailContent) {
              emailContent.content = emailContent.content.replace("$username$", user.username);
              emailContent.content = emailContent.content.replace("$activelink$", "http://andy-express.herokuapp.com/express/checkCode/".concat(user.email, "/").concat(user.code));
              (0, _sendEmail["default"])({
                from: "AndyExpress <yvetteandyadmin@163.com>",
                to: req.body.email,
                subject: emailContent.summary,
                html: emailContent.content
              });
            };

            _announcement["default"].find({
              title: "用户注册通知"
            }).then(function (announcements) {
              getEmailContent(announcements[0]);
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
        res.redirect("http://andyexpress.andyliu.ca/#/login/login");
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
  var localTime = Date.now();
  var localOffset = -240 * 60 * 1000;

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

            _userInfo["default"].findOne({
              user_id: user._id
            }).then(function (userExisted) {
              if (!userExisted) {
                _userInfo["default"].create({
                  user_id: user._id,
                  username: user.username,
                  email: user.email,
                  last_login_time: new Date(),
                  level: "Normal/普通会员"
                });
              }

              _userInfo["default"].updateOne({
                user_id: user._id
              }, {
                $set: {
                  last_login_time: new Date()
                }
              }).then(function () {
                return res.json({
                  id: user._id,
                  success: true,
                  code: 0,
                  token: "Bearer " + token
                });
              })["catch"](function (err) {
                return res.status(400).json("Error: " + err);
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
      var getEmailContent = function getEmailContent(emailContent) {
        emailContent.content = emailContent.content.replace("$username$", user.username);
        emailContent.content = emailContent.content.replace("$activelink$", "http://andyexpress.andyliu.ca/#/resetpassword/".concat(user.email, "/").concat(user.code, "/true"));
        (0, _sendEmail["default"])({
          from: "AndyExpress <yvetteandyadmin@163.com>",
          to: req.body.email,
          subject: emailContent.summary,
          html: emailContent.content
        });
      };

      _announcement["default"].find({
        title: "密码重置通知"
      }).then(function (announcements) {
        getEmailContent(announcements[0]);
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

authController.userResetPassword = function (req, res) {
  _bcryptjs["default"].compare(req.body.oldPassword, req.user.password).then(function (isMatch) {
    if (isMatch) {
      _bcryptjs["default"].genSalt(10, function (err, salt) {
        _bcryptjs["default"].hash(req.body.newPassword, salt, function (err, hash) {
          if (err) {
            throw err;
          }

          var password = hash;

          _user["default"].findOneAndUpdate({
            email: req.user.email
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
    } else {
      res.status(400).json("密码错误, 请输入正确的密码！");
    }
  });
};

var _default = authController;
exports["default"] = _default;