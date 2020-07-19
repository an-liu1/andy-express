import User from "../../model/user.model";
import UserInfo from "../../model/andyexpress/userInfo.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../../config/keys";
import mail from "../../config/sendEmail";
import Announcement from "../../model/andyexpress/announcement.model";

const authController = {};

authController.userRegister = (req, res) => {
  User.find({
    $or: [{ email: req.body.email }, { username: req.body.username }],
  }).then((user) => {
    if (user.length !== 0) {
      return res.status(400).json("用户名或用户邮箱已存在，请重新输入!");
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) {
            throw err;
          }
          req.body.password = hash;
          req.body.code = Math.abs(
            Math.random()
              .toString()
              .split("")
              .reduce(function (p, c) {
                return (p << 5) - p + c;
              })
          )
            .toString(36)
            .substr(0, 8);
          User.create(req.body)
            .then((user) => {
              var getEmailContent = (emailContent) => {
                emailContent.content = emailContent.content.replace(
                  "$username$",
                  user.username
                );
                emailContent.content = emailContent.content.replace(
                  "$activelink$",
                  `http://andy-express.herokuapp.com/express/checkCode/${user.email}/${user.code}`
                );
                mail({
                  from: "AndyExpress <yvetteandyadmin@163.com>",
                  to: req.body.email,
                  subject: emailContent.summary,
                  html: emailContent.content,
                });
              };
              Announcement.find({ title: "用户注册通知" }).then(
                (announcements) => {
                  getEmailContent(announcements[0]);
                }
              );
              return res.json({
                success: true,
                code: 0,
                data: user,
              });
            })
            .catch((err) => res.status(400).json("Error: " + err));
        });
      });
    }
  });
};

authController.checkCode = (req, res) => {
  var email = req.params.email;
  var code = req.params.code;
  User.findOne({ email })
    .then((user) => {
      if (
        user.code === code &&
        Date.now() - Date.parse(user.createdAt) < 864000000
      ) {
        User.findOneAndUpdate({ email: email }, { islive: true }, { new: true })
          .then(() => {
            res.redirect("http://andyexpress.andyliu.ca/#/login/login");
            res.end();
          })
          .catch((err) => res.status(400).json("Error: " + err));
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

authController.userLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  var localTime = Date.now();
  var localOffset = -240 * 60 * 1000;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json("用户名不存在!");
    } else {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const rule = { id: user._id, username: user.username };
          jwt.sign(
            rule,
            keys.secretOrkey,
            { expiresIn: 36000 },
            (err, token) => {
              if (err) {
                throw err;
              }
              if (!user.islive) {
                return res.status(400).json("请先激活用户再登录");
              }
              UserInfo.findOne({ user_id: user._id })
                .then((userExisted) => {
                  if (!userExisted) {
                    UserInfo.create({
                      user_id: user._id,
                      username: user.username,
                      email: user.email,
                      last_login_time: new Date(),
                      level: "Normal/普通会员",
                    });
                  }
                  UserInfo.updateOne(
                    { user_id: user._id },
                    {
                      $set: {
                        last_login_time: new Date(),
                      },
                    }
                  )
                    .then(() =>
                      res.json({
                        id: user._id,
                        success: true,
                        code: 0,
                        token: "Bearer " + token,
                      })
                    )
                    .catch((err) => res.status(400).json("Error: " + err));
                })
                .catch((err) => res.status(400).json("Error: " + err));
            }
          );
        } else {
          return res.status(400).json("密码错误!");
        }
      });
    }
  });
};

authController.requestReset = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        var getEmailContent = (emailContent) => {
          emailContent.content = emailContent.content.replace(
            "$username$",
            user.username
          );
          emailContent.content = emailContent.content.replace(
            "$activelink$",
            `http://andyexpress.andyliu.ca/#/resetpassword/${user.email}/${user.code}/true`
          );
          mail({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: req.body.email,
            subject: emailContent.summary,
            html: emailContent.content,
          });
        };
        Announcement.find({ title: "密码重置通知" }).then((announcements) => {
          getEmailContent(announcements[0]);
        });
        return res.json({
          success: true,
          code: 0,
        });
      } else {
        return res.status(400).json("此用户不存在, 请输入正确的邮箱账户！");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

authController.resetPassword = (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      if (err) {
        throw err;
      }
      let password = hash;
      User.findOneAndUpdate(
        { email: req.body.email },
        { password: password },
        { new: true }
      ).then(() =>
        res.json({
          success: true,
          code: 0,
        })
      );
    });
  });
};

authController.userResetPassword = (req, res) => {
  bcrypt.compare(req.body.oldPassword, req.user.password).then((isMatch) => {
    if (isMatch) {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.newPassword, salt, function (err, hash) {
          if (err) {
            throw err;
          }
          let password = hash;
          User.findOneAndUpdate(
            { email: req.user.email },
            { password: password },
            { new: true }
          ).then(() =>
            res.json({
              success: true,
              code: 0,
            })
          );
        });
      });
    } else {
      res.status(400).json("密码错误, 请输入正确的密码！");
    }
  });
};

export default authController;
