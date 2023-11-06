"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _aftersale = _interopRequireDefault(require("../../model/andyexpress/aftersale.model"));

var _orderForm = _interopRequireDefault(require("../../model/andyexpress/orderForm.model"));

var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));

var _announcement = _interopRequireDefault(require("../../model/andyexpress/announcement.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import fs from "fs";
var aftersaleController = {}; // 客户提交售后申请

aftersaleController.createAfterSale = function (req, res) {
  req.body.username = req.user.username;
  req.body.user_id = req.user.id;
  req.body.email = req.user.email;
  req.body.is_solve = 0;
  req.body.compensation = "";

  _aftersale["default"].create(req.body).then(function (after) {
    _orderForm["default"].updateOne({
      _id: req.body.order_id
    }, {
      $set: {
        is_aftersale: true
      }
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    }); //加邮件提示已成功


    _orderForm["default"].find({
      _id: req.body.order_id
    }).then(function (order1) {
      var getEmailContent = function getEmailContent(emailContent) {
        emailContent.content = emailContent.content.replace("$username$", order1[0].username);
        emailContent.content = emailContent.content.replace("$orderId$", order1[0]._id);
        (0, _sendEmail["default"])({
          from: "AndyExpress <yvetteandyadmin@163.com>",
          to: order1[0].email,
          subject: emailContent.summary,
          html: emailContent.content
        });
      };

      _announcement["default"].find({
        title: "售后提交通知"
      }).then(function (announcements) {
        getEmailContent(announcements[0]);
      });
    });

    return res.json({
      success: true,
      code: 0,
      data: after
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 客服反馈售后


aftersaleController.solveAfterSale = function (req, res) {
  _aftersale["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (after) {
    _orderForm["default"].updateOne({
      _id: req.body.order_id
    }, {
      $set: {
        compensation: req.body.compensation
      }
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    }); //加邮件反馈给客户


    _orderForm["default"].find({
      _id: req.body.order_id
    }).then(function (order1) {
      var getEmailContent = function getEmailContent(emailContent) {
        emailContent.content = emailContent.content.replace("$username$", order1[0].username);
        emailContent.content = emailContent.content.replace("$orderId$", order1[0]._id);
        (0, _sendEmail["default"])({
          from: "AndyExpress <yvetteandyadmin@163.com>",
          to: order1[0].email,
          subject: emailContent.summary,
          html: emailContent.content
        });
      };

      _announcement["default"].find({
        title: "售后反馈通知"
      }).then(function (announcements) {
        getEmailContent(announcements[0]);
      });
    });

    return res.json({
      success: true,
      code: 0,
      data: after
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; //客户确认同意售后方案


aftersaleController.conformAfterSale = function (req, res) {
  req.body.is_solve = 1;

  _aftersale["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (after) {
    return res.json({
      success: true,
      code: 0,
      data: after
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 售后信息详情


aftersaleController.getAfterSale = function (req, res) {
  _aftersale["default"].find({
    _id: req.params.id
  }).then(function (after) {
    return res.json({
      success: true,
      code: 0,
      data: after
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 客户获取所有售后


aftersaleController.getUserAfterSale = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _aftersale["default"].find({
    user_id: req.user.id
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (after) {
    return res.json({
      success: true,
      code: 0,
      data: after
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 后台获取所有售后


aftersaleController.getAdminAfterSale = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _aftersale["default"].find().sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (after) {
    return res.json({
      success: true,
      code: 0,
      data: after
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

aftersaleController.searchAdminAfterSale = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _aftersale["default"].find({
    $or: [{
      user_id: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
      email: eval("/".concat(req.body.searchString, "/i"))
    }, {
      aftersale_title: eval("/".concat(req.body.searchString, "/i"))
    }, {
      aftersale_content: eval("/".concat(req.body.searchString, "/i"))
    }, {
      solution: eval("/".concat(req.body.searchString, "/i"))
    }, {
      compensation: eval("/".concat(req.body.searchString, "/i"))
    }]
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (after) {
    return res.json({
      success: true,
      code: 0,
      data: after
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = aftersaleController;
exports["default"] = _default;