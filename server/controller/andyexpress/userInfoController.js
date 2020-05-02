import UserInfo from "../../model/andyexpress/userInfo.model";
import fs from "fs";
import path from "path";

const userInfoController = {};

// 获取用户总数
userInfoController.getUserNumber = (req, res) => {
  UserInfo.find()
    .then((user) => {
      let adminUserNumber = user.filter((i) => i.level === "Admin/管理员").length;
      let UserNumber = user.length;
      let normalUserNumber = UserNumber - adminUserNumber;
      return res.json({
        success: true,
        code: 0,
        data: {
          adminUserNumber,
          UserNumber,
          normalUserNumber,
        },
      });
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
};

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
  fs.mkdir("./public/images/andyexpress/avatar", function () {});
  let imagePath = `images/andyexpress/avatar/${req.user.id}_${time}.png`;
  fs.writeFile(path.resolve(`./public/${imagePath}`), dataBuffer, function (
    err
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("创建成功");
    }
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
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  UserInfo.find()
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((user) => res.json({ data: user, success: true, code: 0 }))
    .catch((err) => res.status(400).json("Error: " + err));
};

userInfoController.searchUser = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  UserInfo.find({
    $or: [
      { user_id: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { email: eval(`/${req.body.searchString}/i`) },
      { phoneNumber: eval(`/${req.body.searchString}/i`) },
    ],
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((user) =>
      res.json({
        success: true,
        code: 0,
        data: user,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

export default userInfoController;
