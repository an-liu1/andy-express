"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _goods = _interopRequireDefault(require("../../model/andyexpress/goods.model"));

var _fs = _interopRequireDefault(require("fs"));

var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var goodsController = {}; // 用户输入待入库物品信息

goodsController.submitGoods = function (req, res) {
  req.body = {
    user_id: req.user.id,
    username: req.user.username,
    goodName: req.body.goodName,
    localExpressNumber: req.body.localExpressNumber,
    localExpressCompany: req.body.localExpressCompany,
    isStorage: 0,
    isPackage: 0,
    goodStatus: "待入库"
  };

  _goods["default"].create(req.body).then(function (good) {
    return res.json({
      success: true,
      code: 0,
      data: good
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 后台更新进仓库物品信息


goodsController.updateGoods = function (req, res) {
  var good_image = req.body.goodImg;
  var base64Data = good_image.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = Buffer.from(base64Data, "base64");
  var time = Date.now();
  var imagePath = "images/andyexpress/goods/".concat(req.user.id, "_").concat(time, ".png");

  _fs["default"].writeFile("./public/".concat(imagePath), dataBuffer, function (err) {
    if (err) return;
  });

  req.body.goodImg = imagePath;
  req.body.isStorage = 1;
  req.body.storageTime = new Date();
  req.body.goodStatus = "已入库";

  _goods["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (good) {
    (0, _sendEmail["default"])({
      from: "AndyExpress <AndyExpress.admin@andyexpress.andyliu.ca>",
      to: req.user.email,
      subject: "[AndyExpress]包裹入库通知",
      text: "\u5C0A\u656C\u7684".concat(req.user.username, "\uFF0C\u60A8\u597D\uFF01\u60A8\u7684\u8D27\u7269 ").concat(good.goodName, " \u5DF2\u5165\u5E93\u3002\u672C\u90AE\u4EF6\u7531\u7CFB\u7EDF\u81EA\u52A8\u53D1\u51FA\uFF0C\u8BF7\u52FF\u76F4\u63A5\u56DE\u590D\uFF01")
    });
    return res.json({
      success: true,
      code: 0,
      data: good
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

goodsController.deleteGoods = function (req, res) {
  _goods["default"].findByIdAndDelete(req.params.id).then(function (good) {
    return res.json({
      success: true,
      code: 0,
      data: good
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 提交退货


goodsController.returnGoods = function (req, res) {
  req.body.goodStatus = "退货中";
  req.body.returnedGoods.map(function (i) {
    _goods["default"].updateOne({
      _id: i
    }, {
      $set: req.body
    }).then(function (good) {
      return res.json({
        success: true,
        code: 0,
        data: good
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  });
}; // 退货完成


goodsController.submitReturnGoods = function (req, res) {
  req.body.goodStatus = "已退货";
  req.body.returnedGoods.map(function (i) {
    _goods["default"].updateOne({
      _id: i
    }, {
      $set: req.body
    }).then(function (good) {
      return res.json({
        success: true,
        code: 0,
        data: good
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  });
}; // 用户获取自己所有物品


goodsController.getGoods = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _goods["default"].find({
    $or: [{
      goodStatus: req.params.status
    }, {
      goodStatus: req.params.status1
    }],
    user_id: req.user.id
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (good) {
    res.json({
      success: true,
      code: 0,
      data: good
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 后台获取全部物品信息


goodsController.getAllGoods = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _goods["default"].find({
    $or: [{
      goodStatus: req.params.status
    }, {
      goodStatus: req.params.status1
    }, {
      goodStatus: req.params.status2
    }]
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (good) {
    return res.json({
      success: true,
      code: 0,
      data: good
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

goodsController.searchGoods = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _goods["default"].find({
    $or: [{
      localExpressNumber: eval("/".concat(req.body.searchString, "/i"))
    }, {
      goodName: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
      note: eval("/".concat(req.body.searchString, "/i"))
    }, {
      returnExpressNumber: eval("/".concat(req.body.searchString, "/i"))
    }],
    goodStatus: req.params.status || req.params.status1 || req.params.status2
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (goods) {
    return res.json({
      success: true,
      code: 0,
      data: goods
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

goodsController.searchGoodsForUser = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _goods["default"].find({
    $or: [{
      localExpressNumber: eval("/".concat(req.body.searchString, "/i"))
    }, {
      goodName: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
      note: eval("/".concat(req.body.searchString, "/i"))
    }, {
      returnExpressNumber: eval("/".concat(req.body.searchString, "/i"))
    }, {
      goodStatus: req.params.status
    }, {
      goodStatus: req.params.status1
    }],
    user_id: req.user.id
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (goods) {
    return res.json({
      success: true,
      code: 0,
      data: goods
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = goodsController;
exports["default"] = _default;