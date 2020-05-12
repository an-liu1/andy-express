"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _orderForm = _interopRequireDefault(require("../../model/andyexpress/orderForm.model"));

var _goods = _interopRequireDefault(require("../../model/andyexpress/goods.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import fs from "fs";
var ordersController = {}; // 后台获取所有订单信息

ordersController.getOrderListNumber = function (req, res) {
  _orderForm["default"].find().then(function (order) {
    return res.json({
      success: true,
      code: 0,
      data: order.length
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 用户打包订单


ordersController.createOrderForm = function (req, res) {
  req.body.user_id = req.user.id;
  req.body.username = req.user.username;
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
  _orderForm["default"].updateOne({
    _id: req.params.id
  }, {
    $set: {
      orderStatus: "已取消"
    }
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
}; // 客服上传订单详情


ordersController.updateOrderForm = function (req, res) {
  // let order_Img = req.body.orderImg;
  // var base64Data = order_Img.replace(/^data:image\/\w+;base64,/, "");
  // var dataBuffer = Buffer.from(base64Data, "base64");
  // let time = Date.now();
  // let imagePath = `images/andyexpress/orders/${req.user.id}_${time}.png`;
  // fs.writeFile(`./public/${imagePath}`, dataBuffer, function (err) {
  //   if (err) return;
  // });
  // req.body.orderImg = imagePath;
  req.body.orderStatus = "已打包";

  _orderForm["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (order) {
    //加发送邮件提醒订单已生成
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