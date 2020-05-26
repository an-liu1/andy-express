"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orderForm = _interopRequireDefault(require("../../model/andyexpress/orderForm.model"));

var _goods = _interopRequireDefault(require("../../model/andyexpress/goods.model"));

var _announcement = _interopRequireDefault(require("../../model/andyexpress/announcement.model"));

var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import fs from "fs";
var ordersController = {}; // 后台获取所有订单信息

ordersController.getOrderListNumber = function (req, res) {
  _orderForm["default"].find().then(function (order) {
    var incomeList = [];
    var profitList = [];
    var compensationList = [];
    order.filter(function (i) {
      return i.orderStatus === "已签收";
    }).map(function (i) {
      incomeList.push(i.incomePrice);
      profitList.push(i.incomePrice - i.costPrice);

      if (i.compensation) {
        compensationList.push(i.compensation);
      }
    });
    var totalIncome = incomeList.reduce(function (tmp, item) {
      return tmp + item;
    });
    var totalProfit = profitList.reduce(function (tmp, item) {
      return tmp + item;
    });
    var totalCompensation = compensationList.reduce(function (tmp, item) {
      return tmp + item;
    });
    return res.json({
      success: true,
      code: 0,
      data: {
        orderNumber: order.length,
        totalIncome: totalIncome,
        totalProfit: totalProfit - totalCompensation,
        totalCompensation: totalCompensation
      }
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 用户打包订单


ordersController.createOrderForm = function (req, res) {
  req.body.user_id = req.user.id;
  req.body.username = req.user.username;
  req.body.email = req.user.email;
  req.body.orderStatus = "待打包";

  _orderForm["default"].create(req.body).then(function (order) {
    //加邮件通知客户
    req.body.orderGoodsList.map(function (i) {
      _goods["default"].updateOne({
        _id: i.goodId
      }, {
        $set: {
          goodStatus: "待打包"
        }
      })["catch"](function (err) {
        return res.status(400).json("Error: " + err);
      });
    });
    return res.json({
      success: true,
      code: 0,
      data: order
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 用户取消订单


ordersController.cancleOrderForm = function (req, res) {
  req.body.orderStatus = "已取消";

  _orderForm["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (order) {
    req.body.orderGoodsList.map(function (i) {
      _goods["default"].updateOne({
        _id: i.goodId
      }, {
        $set: {
          goodStatus: "已入库"
        }
      })["catch"](function (err) {
        return res.status(400).json("Error: " + err);
      });
    });
    return res.json({
      success: true,
      code: 0,
      data: order
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 客服获取全部已取消且付费订单


ordersController.getPaiedCancleOrderForm = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _orderForm["default"].find({
    orderStatus: "已取消",
    cancleFee: {
      $gt: 0
    }
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (order) {
    return res.json({
      success: true,
      code: 0,
      data: order
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 客服上传订单详情


ordersController.updateOrderForm = function (req, res) {
  req.body.orderStatus = "已打包";

  _orderForm["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (order) {
    //加发送邮件提醒订单已生成
    _orderForm["default"].find({
      _id: req.params.id
    }).then(function (order1) {
      var getEmailContent = function getEmailContent(emailContent) {
        emailContent.content = emailContent.content.replace("$username$", order1[0].username);
        emailContent.content = emailContent.content.replace("$_id$", order1[0]._id);
        (0, _sendEmail["default"])({
          from: "AndyExpress <yvetteandyadmin@163.com>",
          to: order1[0].email,
          subject: emailContent.summary,
          html: emailContent.content
        });
      };

      _announcement["default"].find({
        title: "打包完成通知"
      }).then(function (announcements) {
        getEmailContent(announcements[0]);
      });
    });

    req.body.goodsLists.map(function (i) {
      _goods["default"].updateOne({
        _id: i
      }, {
        $set: {
          goodStatus: "已打包",
          isPackage: 1,
          packageTime: req.body.packageTime
        }
      })["catch"](function (err) {
        return res.status(400).json("Error: " + err);
      });
    });
    return res.json({
      success: true,
      code: 0,
      data: order
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 客户填写邮寄地址等待发货


ordersController.orderDelivery = function (req, res) {
  req.body.map(function (i) {
    i.orderStatus = "待发货";

    _orderForm["default"].updateOne({
      _id: i.orderId
    }, {
      $set: i
    }).then(function (order) {
      return res.json({
        success: true,
        code: 0,
        data: order
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  });
}; // 客服填写订单物流信息详情


ordersController.orderDelivering = function (req, res) {
  req.body.orderStatus = "已发货";

  _orderForm["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (order) {
    _orderForm["default"].find({
      _id: req.params.id
    }).then(function (order1) {
      var getEmailContent = function getEmailContent(emailContent) {
        emailContent.content = emailContent.content.replace("$username$", order1[0].username);
        emailContent.content = emailContent.content.replace("$_id$", order1[0]._id);
        (0, _sendEmail["default"])({
          from: "AndyExpress <yvetteandyadmin@163.com>",
          to: order1[0].email,
          subject: emailContent.summary,
          html: emailContent.content
        });
      };

      _announcement["default"].find({
        title: "订单发货通知"
      }).then(function (announcements) {
        getEmailContent(announcements[0]);
      });
    });

    return res.json({
      success: true,
      code: 0,
      data: order
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 客户确认完成订单并评价


ordersController.isDeliveryAndRank = function (req, res) {
  req.body.map(function (i) {
    i.isDelivery = 1;
    i.orderStatus = "已签收";

    _orderForm["default"].updateOne({
      _id: i.id
    }, {
      $set: i
    }).then(function (order) {
      return res.json({
        success: true,
        code: 0,
        data: order
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  });
}; // 后台获取所有订单信息


ordersController.getAllOrderForm = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _orderForm["default"].find({
    $or: [{
      orderStatus: req.params.status
    }, {
      orderStatus: req.params.status1
    }, {
      orderStatus: req.params.status2
    }]
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (order) {
    return res.json({
      success: true,
      code: 0,
      data: order
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 用户获取订单信息


ordersController.getOrderForm = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _orderForm["default"].find({
    $or: [{
      orderStatus: req.params.status
    }, {
      orderStatus: req.params.status1
    }, {
      orderStatus: req.params.status2
    }],
    user_id: req.user.id
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (order) {
    return res.json({
      success: true,
      code: 0,
      data: order
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

ordersController.searchOrders = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _orderForm["default"].find({
    $or: [{
      user_id: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
      orderShippingNumber: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }],
    orderStatus: {
      $in: [req.params.status, req.params.status1, req.params.status2]
    }
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (orders) {
    return res.json({
      success: true,
      code: 0,
      data: orders
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

ordersController.searchOrdersForUser = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _orderForm["default"].find({
    $or: [{
      user_id: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
      orderShippingNumber: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }],
    user_id: req.user.id,
    orderStatus: {
      $in: [req.params.status, req.params.status1, req.params.status2]
    }
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (orders) {
    return res.json({
      success: true,
      code: 0,
      data: orders
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = ordersController;
exports["default"] = _default;