"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gebisPassport = void 0;

var _user = _interopRequireDefault(require("../model/gebis/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 专门用来配置Passport  验证jwt   配置的话，搜索passport-jwt
var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt; //引入keys文件


var keys = require("./keys"); //引入mongoose


var mongoose = require("mongoose"); //把数据库创建model后的文件引进来,为了查找用户


var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;

var gebisPassport = function gebisPassport(passport) {
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    // console.log(jwt_payload)  // 保存了解析后的用户信息
    //根据引进来的model从数据库里查找该用户的信息，并返回
    _user["default"].findById(jwt_payload.id).then(function (user) {
      if (user) {
        return done(null, user); //返回用户信息
      }

      return done(null, false);
    })["catch"](function (err) {
      return console.log(err);
    });
  }));
};

exports.gebisPassport = gebisPassport;