import jwt from "jsonwebtoken";
import keys from "../../config/keys";
import User from "../../model/carpool/user.model";
import carpoolInfoList from "../../model/carpool/carpoolInfoList.model";
import appOpen from "../../model/carpool/appOpen.model";

const authController = {};

authController.setAPPOpenTimes = (req, res) => {
  appOpen
    .find()
    .then((appOpenTimes) => {
      let beOpenedTimes = appOpenTimes[0].beOpenedTimes + 1;
      appOpen.updateOne({ $set: { beOpenedTimes: beOpenedTimes } }).then(() => {
        return res.json({
          success: true,
          code: 0,
        });
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

authController.getOpenId = (req, res) => {
  let code = req.body.code; //获取小程序传来的code
  let appid = "wxa438f6a5e945514b"; //自己小程序后台管理的appid，可登录小程序后台查看
  let secret = "21c50b79b63d02f1702d0d4c009d6673"; //小程序后台管理的secret，可登录小程序后台查看
  let grant_type = "authorization_code"; // 授权（必填）默认值
  let url =
    "https://api.weixin.qq.com/sns/jscode2session?grant_type=" +
    grant_type +
    "&appid=" +
    appid +
    "&secret=" +
    secret +
    "&js_code=" +
    code;
  let https = require("https");
  https.get(url, (resp) => {
    let openid, sessionKey;
    resp
      .on("data", (d) => {
        openid = JSON.parse(d).openid; //得到openid
        sessionKey = JSON.parse(d).session_key; //得到session_key
        User.findOne({ openid: openid }).then((user) => {
          if (!user) {
            req.body.last_login_time = new Date();
            req.body.openid = openid;
            req.body.sessionKey = sessionKey;
            req.body.username = req.body.nickName;
            User.create(req.body);
          } else {
            let rule = {
              id: user._id,
              openid: openid,
              sessionKey: sessionKey,
            };
            jwt.sign(
              rule,
              keys.secretOrkey,
              { expiresIn: 36000 },
              (err, token) => {
                if (err) {
                  throw err;
                }
                return res.json({
                  success: true,
                  code: 0,
                  data: { token: "Bearer " + token },
                });
              }
            );
          }
        });
      })
      .on("error", (e) => {
        console.error(e);
      });
  });
};

authController.getAPPStatistics = (req, res) => {
  User.find()
    .then((userInfo) => {
      carpoolInfoList.find().then((carpool) => {
        appOpen.find().then((appOpenTimes) => {
          return res.json({
            success: true,
            code: 0,
            data: {
              user: userInfo.length,
              carpool: carpool.length,
              appOpenTimes: appOpenTimes[0].beOpenedTimes,
            },
          });
        });
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

authController.getUserInfo = (req, res) => {
  User.find({ _id: req.user.id })
    .then((userInfo) => {
      return res.json({
        success: true,
        code: 0,
        data: userInfo[0],
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default authController;
