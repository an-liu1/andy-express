import pmoUserInfo from "../../model/freepmo/pmoUserInfo.model";
import User from "../../model/user.model";
import bcrypt from "bcryptjs";
import fs from "fs";

const pmoUserInfoController = {};

pmoUserInfoController.getUserInfo = (req, res) => {
  pmoUserInfo
    .find({ user_id: req.user.id })
    .then((user) => {
      res.json({
        data: user,
        success: true,
        code: 0,
      });
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
    });
};

pmoUserInfoController.updateUserInfo = (req, res) => {
  pmoUserInfo
    .updateOne({ _id: req.body._id }, req.body)
    .then(() => {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, function (err, hash) {
          if (err) {
            throw err;
          }
          req.body.password = hash;
          User.updateOne({ _id: req.body.user_id }, { password: hash })
            .then(() =>
              res.json({
                success: true,
                code: 0,
              })
            )
            .catch((err) => res.status(400).json("Error: " + err));
        });
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

pmoUserInfoController.avatarUpload = (req, res) => {
  let avatar = req.body.avatar;
  var base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = Buffer.from(base64Data, "base64");
  let time = Date.now();
  let imagePath = `images/freepmo/avatar/${req.user.id}_${time}.png`;
  fs.writeFile(`./public/${imagePath}`, dataBuffer, function (err) {
    if (err) return;
  });
  pmoUserInfo
    .updateOne({ user_id: req.user.id }, { avatar: imagePath })
    .then(() =>
      res.json({
        success: true,
        code: 0,
      })
    );
};

export default pmoUserInfoController;
