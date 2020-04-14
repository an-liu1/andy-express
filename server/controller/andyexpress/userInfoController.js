import UserInfo from "../../model/andyexpress/userInfo.model";
import fs from "fs";

const userInfoController = {};

// 获取用户信息
userInfoController.getUserInfo = (req, res) => {
  UserInfo.find({ user_id: req.user.id })
    .then((user) => {
      res.json({
        success: true,
        code: 0,
        data: user,
      });
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
};

// 用户信息更改
userInfoController.updateUserInfo = (req, res) => {
  UserInfo.updateOne({ user_id: req.user.id }, req.body)
    .then((user) =>
      res.json({
        success: true,
        code: 0,
        data: user,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 头像上传
userInfoController.avatarUpload = (req, res) => {
  let avatar = req.body.avatar;
  var base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = Buffer.from(base64Data, "base64");
  let time = Date.now();
  let imagePath = `images/andyexpress/avatar/${time}.png`;
  fs.writeFile(`public/${imagePath}`, dataBuffer, function (err, written, buffer) {
    console.log(err)
    console.log(written)
    console.log(buffer)
    if (err) return;
  });
  UserInfo.updateOne({ user_id: req.user.id }, { avatar: imagePath }).then(
    (user) =>
      res.json({
        success: true,
        code: 0,
        data: user,
      })
  );
};

// 后台获取所有用户
userInfoController.getAllUser = (req, res) => {
  UserInfo.find()
    .then((user) => res.json({ data: user, success: true, code: 0 }))
    .catch((err) => res.status(400).json("Error: " + err));
};

export default userInfoController;
