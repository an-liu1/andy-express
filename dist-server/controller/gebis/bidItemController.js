"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bidItems = _interopRequireDefault(require("../../model/gebis/bidItems.model"));

var _user = _interopRequireDefault(require("../../model/gebis/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import bidClass from "../../model/gebis/bidClass.model";
var xlsx = require("node-xlsx");

var bidItemController = {};

bidItemController.createBidItem = function (req, res) {
  req.body.creator = req.user.name;
  req.body.creator_id = req.user.id;

  _bidItems["default"].create(req.body).then(function () {
    return res.json({
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.getBidItemByClass = function (req, res) {
  _bidItems["default"].find({
    class_id: req.params.id,
    isDeleted: false
  }).sort({
    updatedAt: "desc"
  }).then(function (bidItem) {
    return res.json({
      success: true,
      code: 0,
      data: bidItem
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.getAllBidItemByClass = function (req, res) {
  _bidItems["default"].find({
    class_id: req.params.id
  }).sort({
    isDeleted: "asc"
  }).sort({
    updatedAt: "desc"
  }).then(function (bidItem) {
    return res.json({
      success: true,
      code: 0,
      data: bidItem
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.deleteBidItem = function (req, res) {
  _bidItems["default"].findOneAndUpdate({
    _id: req.body.id
  }, {
    $set: {
      isDeleted: req.body.isDeleted
    }
  }).then(function () {
    return res.json({
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.getBidItem = function (req, res) {
  _bidItems["default"].find({
    _id: req.params.id
  }).then(function (bidItem) {
    return res.json({
      success: true,
      code: 0,
      data: bidItem[0]
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.getBidItemFinalPrice = function (req, res) {
  _bidItems["default"].find({
    _id: req.params.id
  }).then(function (bidItem) {
    return res.json({
      success: true,
      code: 0,
      data: bidItem[0].finalPrice
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.updateBidItem = function (req, res) {
  _bidItems["default"].findOneAndUpdate({
    _id: req.body._id
  }, {
    $set: req.body
  }).then(function () {
    return res.json({
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.getMyBidCollection = function (req, res) {
  _user["default"].find({
    _id: req.user.id
  }).then(function (userInfo) {
    var collected_bidItem = userInfo[0].collected_bidItem;

    _bidItems["default"].find({
      _id: {
        $in: collected_bidItem
      }
    }).then(function (bidItem) {
      return res.json({
        success: true,
        code: 0,
        data: bidItem
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.getMyBidItem = function (req, res) {
  _bidItems["default"].find({
    endDate: {
      $lte: new Date()
    },
    finalBuyerId: req.user.id
  }).then(function (bidItem) {
    return res.json({
      success: true,
      code: 0,
      data: bidItem
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

bidItemController.getExportList = function (req, res) {
  _bidItems["default"].find({
    endDate: {
      $lte: new Date()
    }
  }, {
    title: 1,
    startDate: 1,
    endDate: 1,
    appraisalPrice: 1,
    finalPrice: 1,
    finalBuyer: 1,
    classTitle: 1,
    bidPriceHistory: 1
  }).then(function (exportData) {
    var dataCVS = "Auction_List-".concat(Math.floor(Math.random() * 1000000000), ".xlsx"); //1

    var alldata = [];
    var row = ["拍品", "开拍时间", "结束时间", "估价", "成交价", "成交人", "类别"];
    alldata.push(row);
    exportData.map(function (i) {
      var arr = [];
      arr.push(i.title);
      arr.push(i.startDate);
      arr.push(i.endDate);
      arr.push(i.appraisalPrice);
      arr.push(i.finalPrice);
      arr.push(i.finalBuyer);
      arr.push(i.classTitle);
      alldata.push(arr);
    }); //2

    var history = [];
    var historyRow = ["拍品", "成交人", "成交价", "电话", "邮箱", "加价时间"];
    history.push(historyRow);
    exportData.map(function (i) {
      i.bidPriceHistory.map(function (j) {
        var arr1 = [];
        arr1.push(i.title);
        arr1.push(j.buyer);
        arr1.push(j.price);
        arr1.push(j.phone);
        arr1.push(j.email);
        arr1.push(j.comfirmTime);
        history.push(arr1);
      });
    });
    var buffer = xlsx.build([{
      name: "Auction_List",
      data: alldata
    }, {
      name: "Auction_Histrory",
      data: history
    }]);
    res.send(buffer);
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = bidItemController;
exports["default"] = _default;