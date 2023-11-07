import jwt from "jsonwebtoken";
import keys from "../../config/keys";
import User from "../../model/gebis/user.model";

const userController = {};

userController.getOpenId = (req, res) => {
  let code = req.body.code; //获取小程序传来的code
  let appid = "wx2379b7a9cc8f038c"; //自己小程序后台管理的appid，可登录小程序后台查看
  let secret = "9c6f1b98c538dd4303c7c30110fea462"; //小程序后台管理的secret，可登录小程序后台查看
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
          req.body.last_login_time = new Date();
          req.body.openid = openid;
          req.body.sessionKey = sessionKey;
          if (!user) {
            User.create(req.body).then((user1) => {
              let rule = {
                id: user1._id,
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
                    token: "Bearer " + token,
                    data: user1,
                  });
                }
              );
            });
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
                  token: "Bearer " + token,
                  data: user,
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

userController.getUserInfo = (req, res) => {
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

userController.updateUserInfo = (req, res) => {
  User.findOneAndUpdate({ _id: req.user.id }, { $set: req.body })
    .then((userInfo) => {
      return res.json({
        success: true,
        code: 0,
        data: userInfo,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

userController.collectBidItem = (req, res) => {
  User.find({ _id: req.user.id })
    .then((userInfo1) => {
      let collectedBidItem = userInfo1[0].collected_bidItem;
      if (collectedBidItem && collectedBidItem.length > 0) {
        if (
          collectedBidItem.filter((i) => i == req.body.collect_id).length > 0
        ) {
          collectedBidItem = collectedBidItem.filter(
            (i) => i !== req.body.collect_id
          );
        } else {
          collectedBidItem = collectedBidItem.concat(req.body.collect_id);
        }
      } else {
        collectedBidItem = [req.body.collect_id];
      }
      User.findOneAndUpdate(
        { _id: req.user.id },
        {
          $set: {
            collected_bidItem: collectedBidItem,
          },
        }
      )
        .then(() => {
          User.find({ _id: req.user.id }).then((userInfo) => {
            return res.json({
              success: true,
              code: 0,
              data: userInfo[0],
            });
          });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default userController;
