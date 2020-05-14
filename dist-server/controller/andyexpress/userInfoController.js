"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _userInfo = _interopRequireDefault(require("../../model/andyexpress/userInfo.model"));

var _fileUpload = require("../../config/fileUpload");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import fs from "fs";
// import path from "path";
var userInfoController = {}; // 获取用户总数

userInfoController.getUserNumber = function (req, res) {
  _userInfo["default"].find().then(function (user) {
    var adminUserNumber = user.filter(function (i) {
      return i.level === "Admin/管理员";
    }).length;
    var UserNumber = user.length;
    var normalUserNumber = UserNumber - adminUserNumber;
    return res.json({
      success: true,
      code: 0,
      data: {
        adminUserNumber: adminUserNumber,
        UserNumber: UserNumber,
        normalUserNumber: normalUserNumber
      }
    });
  })["catch"](function (err) {
    res.status(400).json("Error: " + err);
  });
}; // 获取用户信息


userInfoController.getUserInfo = function (req, res) {
  _userInfo["default"].find({
    user_id: req.user.id
  }).then(function (user) {
    res.json({
      success: true,
      code: 0,
      data: user
    });
  })["catch"](function (err) {
    res.status(400).json("Error: " + err);
  });
}; // 用户信息更改


userInfoController.updateUserInfo = function (req, res) {
  _userInfo["default"].updateOne({
    user_id: req.user.id
  }, req.body).then(function (user) {
    return res.json({
      success: true,
      code: 0,
      data: user
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 头像上传


userInfoController.avatarUpload = function (req, res) {
  var avatar = req.body.avatar; // var base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
  // var dataBuffer = Buffer.from(base64Data, "base64");
  // let time = Date.now();
  // fs.mkdir("./public/images/andyexpress/avatar", function () {});
  // let imagePath = `images/andyexpress/avatar/${req.user.id}_${time}.png`;
  // let imagePath = `avatar/${req.user.id}_${time}.png`;
  // uploadFile(imagePath, avatar);
  // fs.writeFile(path.resolve(`./public/${imagePath}`), dataBuffer, function (
  //   err
  // ) {
  //   if (err) {
  //     console.log(err);
  //   } else {
  //     console.log("创建成功");
  //   }
  // });

  _userInfo["default"].updateOne({
    user_id: req.user.id
  }, {
    avatar: avatar
  }).then(function (user) {
    return res.json({
      success: true,
      code: 0,
      data: user
    });
  });
}; // 后台获取所有用户


userInfoController.getAllUser = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _userInfo["default"].find().sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (user) {
    return res.json({
      data: user,
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

userInfoController.searchUser = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _userInfo["default"].find({
    $or: [{
      user_id: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
      email: eval("/".concat(req.body.searchString, "/i"))
    }, {
      phoneNumber: eval("/".concat(req.body.searchString, "/i"))
    }]
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (user) {
    return res.json({
      success: true,
      code: 0,
      data: user
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 获取token


userInfoController.getUpToken = function (req, res) {
  var imagePath = "".concat(req.user.id, "_").concat(req.params.uploadTime, ".png");
  var token = (0, _fileUpload.getUpToken)(imagePath);
  return res.json({
    success: true,
    code: 0,
    data: {
      token: token,
      key: imagePath
    }
  });
}; //充值


userInfoController.rechargeAccount = function (req, res) {
  _userInfo["default"].find({
    user_id: req.user.id
  }).then(function (user) {
    var totalBalance = parseInt(user[0].balance) + parseInt(req.body.rechargeBalance);

    _userInfo["default"].updateOne({
      _id: user._id
    }, {
      $set: {
        balance: parseInt(totalBalance)
      }
    }).then(function (user) {
      return res.json({
        success: true,
        code: 0,
        data: user
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  })["catch"](function (err) {
    res.status(400).json("Error: " + err);
  });
}; //付款


userInfoController.payFromAccount = function (req, res) {
  _userInfo["default"].find({
    user_id: req.user.id
  }).then(function (user) {
    var totalBalance = parseInt(user[0].balance) - parseInt(req.body.payBalance);

    if (parseInt(totalBalance) < 0) {
      return res.status(400).json("余额不足, 请充值！");
    }

    _userInfo["default"].updateOne({
      _id: user._id
    }, {
      $set: {
        balance: parseInt(totalBalance)
      }
    }).then(function (user) {
      return res.json({
        success: true,
        code: 0,
        data: user
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  })["catch"](function (err) {
    res.status(400).json("Error: " + err);
  });
};

var _default = userInfoController;
exports["default"] = _default;