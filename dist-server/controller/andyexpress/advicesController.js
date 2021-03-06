"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _advices = _interopRequireDefault(require("../../model/andyexpress/advices.model"));

var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));

var _announcement = _interopRequireDefault(require("../../model/andyexpress/announcement.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import fs from "fs";
var advicesController = {}; // 用户发起投诉申请

advicesController.createAdvice = function (req, res) {
  var advice = {
    usernam: req.user.username,
    user_id: req.user.id,
    email: req.user.email,
    advice_title: req.body.advice_title,
    advice_type: req.body.advice_type,
    advice_content: req.body.advice_content,
    evident_image: req.body.evident_image
  };

  _advices["default"].create(advice).then(function (advice) {
    var getEmailContent = function getEmailContent(emailContent) {
      emailContent.content = emailContent.content.replace("$username$", req.user.username);
      (0, _sendEmail["default"])({
        from: "AndyExpress <yvetteandyadmin@163.com>",
        to: req.user.email,
        subject: emailContent.summary,
        html: emailContent.content
      });
    };

    _announcement["default"].find({
      title: "投诉提交通知"
    }).then(function (announcements) {
      getEmailContent(announcements[0]);
    });

    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 具体投诉详情


advicesController.getAdvice = function (req, res) {
  _advices["default"].find({
    _id: req.params.id
  }).then(function (advice) {
    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 客户所有投诉


advicesController.getUserAdvice = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _advices["default"].find({
    user_id: req.user.id
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (advice) {
    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 后台所有投诉


advicesController.getAdminAdvice = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _advices["default"].find().sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (advice) {
    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 客服反馈建议


advicesController.updateAdvice = function (req, res) {
  _advices["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (advice) {
    //加邮件反馈给客户
    _advices["default"].find({
      _id: req.params.id
    }).then(function (advice1) {
      var getEmailContent = function getEmailContent(emailContent) {
        emailContent.content = emailContent.content.replace("$username$", advice1[0].username);
        (0, _sendEmail["default"])({
          from: "AndyExpress <yvetteandyadmin@163.com>",
          to: advice1[0].email,
          subject: emailContent.summary,
          html: emailContent.content
        });
      };

      _announcement["default"].find({
        title: "投诉反馈通知"
      }).then(function (announcements) {
        getEmailContent(announcements[0]);
      });
    });

    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

advicesController.searchAdminAdvice = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _advices["default"].find({
    $or: [{
      user_id: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
      email: eval("/".concat(req.body.searchString, "/i"))
    }, {
      advice_title: eval("/".concat(req.body.searchString, "/i"))
    }, {
      advice_content: eval("/".concat(req.body.searchString, "/i"))
    }]
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (advice) {
    return res.json({
      success: true,
      code: 0,
      data: advice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = advicesController;
exports["default"] = _default;