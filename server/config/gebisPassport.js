// 专门用来配置Passport  验证jwt   配置的话，搜索passport-jwt
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
//引入keys文件
const keys = require("./keys");
//引入mongoose
const mongoose = require("mongoose");

//把数据库创建model后的文件引进来,为了查找用户
import User from "../model/gebis/user.model";

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrkey;

export const gebisPassport = (passport) => {
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      // console.log(jwt_payload)  // 保存了解析后的用户信息
      //根据引进来的model从数据库里查找该用户的信息，并返回
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, user); //返回用户信息
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
};
