"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _aftersale = _interopRequireDefault(require("../../model/andyexpress/aftersale.model"));

var _orderForm = _interopRequireDefault(require("../../model/andyexpress/orderForm.model"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var aftersaleController = {}; // 客户提交售后申请

aftersaleController.createAfterSale = function (req, res) {
  req.body.username = req.user.username;
  req.body.user_id = req.user.id;
  req.body.email = req.user.email;
  var imagePath = req.body.aftersale_image.map(function (i) {
    var base64Data = i.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, "base64");
    var time = Date.now();
    var image = "images/andyexpress/aftersale/".concat(req.user.id, "_").concat(time, ".png");

    _fs["default"].writeFile("./public/".concat(image), dataBuffer, function (err) {
      if (err) return;
    });

    return image;
  });
  req.body.aftersale_image = imagePath;
  req.body.is_solve = 0;
  req.body.compensation = "";

  _aftersale["default"].create(req.body).then(function (after) {
    return (//加邮件提示已成功
      res.json({
        success: true,
        code: 0,
        data: after
      })
    );
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
    }); //加邮件反馈给客户


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

  _aftersale["default"].find().skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (after) {
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