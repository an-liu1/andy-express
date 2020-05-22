import User from "../../model/user.model";
import pmoUserInfo from "../../model/freepmo/pmoUserInfo.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../../config/keys";
import mail from "../../config/sendEmail";

const authController = {};

authController.userRegister = (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json("用户邮箱已存在!");
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
              mail({
                from: "freePMO <yvetteandyadmin@163.com>",
                to: req.body.email,
                subject: "[freePMO]激活邮箱账号",
                text: `尊敬的${user.username}，您好！点击链接即可激活您的freePMO账号, http://andy-express.herokuapp.com/freepmo/checkCode/${user.email}/${user.code} 为保障您的帐号安全，请在24小时内点击该链接，您也可以将链接复制到浏览器地址栏访问。 若如果并没您的操作，请忽略本邮件，由此给您带来的不便请谅解。本邮件由系统自动发出，请勿直接回复！`,
              });
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
            res.redirect("http://freepmo.andyliu.ca/#/login");
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
              pmoUserInfo
                .findOne({ user_id: user._id })
                .then((userExisted) => {
                  if (!userExisted) {
                    pmoUserInfo.create({
                      user_id: user._id,
                      username: user.username,
                      email: user.email,
                    });
                  }
                  res.json({
                    id: user._id,
                    success: true,
                    code: 0,
                    token: "Bearer " + token,
                  });
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
        mail({
          from: "freePMO <freePMO.admin@freepmo.andyliu.ca>",
          to: req.body.email,
          subject: "[freePMO]账号密码重置命令，请求激活",
          text: `尊敬的${user.username}，您好！点击链接即可跳转至密码重置界面, http://freepmo.andyliu.ca/resetpassword/${user.email}/${user.code}/true 为保障您的帐号安全，请在24小时内点击该链接，您也可以将链接复制到浏览器地址栏访问。 若如果并没您的操作，请忽略本邮件，由此给您带来的不便请谅解。本邮件由系统自动发出，请勿直接回复！`,
        });
        return res.json({
          success: true,
          code: 0,
        });
      } else {
        return res.status(400).json("请输入正确的邮箱账户！");
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

export default authController;
