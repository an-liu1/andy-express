"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _goods = _interopRequireDefault(require("../../model/andyexpress/goods.model"));

var _sendEmail = _interopRequireDefault(require("../../config/sendEmail"));

var _announcement = _interopRequireDefault(require("../../model/andyexpress/announcement.model"));

var _userInfo = _interopRequireDefault(require("../../model/andyexpress/userInfo.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import fs from "fs";
var goodsController = {}; // 用户输入待入库物品信息

goodsController.submitGoods = function (req, res) {
  req.body = {
    user_id: req.user.id,
    username: req.user.username,
    email: req.user.email,
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
}; // 客户更新待入库信息


goodsController.userUpdateGoods = function (req, res) {
  _goods["default"].updateOne({
    _id: req.params.id
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
}; // 后台更新进仓库物品信息


goodsController.updateGoods = function (req, res) {
  req.body.isStorage = 1;
  req.body.goodStatus = "已入库";

  _goods["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function () {
    _goods["default"].find({
      _id: req.params.id
    }).then(function (good) {
      var getEmailContent = function getEmailContent(emailContent) {
        emailContent.content = emailContent.content.replace("$username$", good[0].username);
        emailContent.content = emailContent.content.replace("$goodName$", good[0].goodName);
        (0, _sendEmail["default"])({
          from: "AndyExpress <yvetteandyadmin@163.com>",
          to: good[0].email,
          subject: emailContent.summary,
          html: emailContent.content
        });
      };

      _announcement["default"].find({
        title: "包裹入库通知"
      }).then(function (announcements) {
        getEmailContent(announcements[0]);
      });

      return res.json({
        success: true,
        code: 0,
        data: good
      });
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
}; //用户取消退货


goodsController.cancleReturnGoods = function (req, res) {
  _goods["default"].find({
    _id: req.params.id
  }).then(function (good) {
    if (good.IsPayed) {
      _userInfo["default"].updateOne({
        _id: req.user.id
      }, {
        $set: {
          balance: balance + good.returnShippingPrice
        }
      })["catch"](function (err) {
        return res.status(400).json("Error: " + err);
      });
    }
  });

  _goods["default"].updateOne({
    _id: req.params.id
  }, {
    $set: {
      goodStatus: "已入库",
      IsPayed: false,
      returnShippingPrice: "",
      returnPayMethod: ""
    }
  }).then(function (good) {
    return res.json({
      success: true,
      code: 0,
      data: good
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
}; // 后台提交退货信息和客户确认并付款


goodsController.submitReturnGoodsInfo = function (req, res) {
  req.body.returnedGoods.map(function (i) {
    _goods["default"].updateOne({
      _id: i
    }, {
      $set: req.body
    }).then(function (good) {
      _goods["default"].find({
        _id: i
      }).then(function (good) {
        var getEmailContent = function getEmailContent(emailContent) {
          emailContent.content = emailContent.content.replace("$username$", good[0].username);
          emailContent.content = emailContent.content.replace("$goodName$", good[0].goodName);
          (0, _sendEmail["default"])({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: good[0].email,
            subject: emailContent.summary,
            html: emailContent.content
          });
        };

        _announcement["default"].find({
          title: "确认退货通知"
        }).then(function (announcements) {
          getEmailContent(announcements[0]);
        });
      });

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
      _goods["default"].find({
        _id: i
      }).then(function (good) {
        var getEmailContent = function getEmailContent(emailContent) {
          emailContent.content = emailContent.content.replace("$username$", good[0].username);
          emailContent.content = emailContent.content.replace("$goodName$", good[0].goodName);
          (0, _sendEmail["default"])({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: good[0].email,
            subject: emailContent.summary,
            html: emailContent.content
          });
        };

        _announcement["default"].find({
          title: "退货完成通知"
        }).then(function (announcements) {
          getEmailContent(announcements[0]);
        });
      });

      return res.json({
        success: true,
        code: 0,
        data: good
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  });
}; // 用户获取取消已付退货款物品


goodsController.getPayedReturnGoods = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };

  _goods["default"].find({
    goodStatus: "退货中",
    IsPayed: true
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (good) {
    res.json({
      success: true,
      code: 0,
      data: good
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
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
  }).sort({
    updatedAt: "desc"
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
  }).sort({
    updatedAt: "desc"
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
      user_id: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
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
    goodStatus: {
      $in: [req.params.status, req.params.status1, req.params.status2]
    }
  }).sort({
    updatedAt: "desc"
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
      user_id: eval("/".concat(req.body.searchString, "/i"))
    }, {
      username: eval("/".concat(req.body.searchString, "/i"))
    }, {
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
    user_id: req.user.id,
    goodStatus: {
      $in: [req.params.status, req.params.status1]
    }
  }).sort({
    updatedAt: "desc"
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