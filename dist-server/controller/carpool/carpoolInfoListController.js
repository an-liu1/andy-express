"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _carpoolInfoList = _interopRequireDefault(require("../../model/carpool/carpoolInfoList.model"));

var _user = _interopRequireDefault(require("../../model/carpool/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var carpoolInfoListController = {};

carpoolInfoListController.createCarpoolAds = function (req, res) {
  req.body.username = req.user.username;
  req.body.user_id = req.user.id;

  _carpoolInfoList["default"].create(req.body).then(function (carpoolInfoList) {
    return res.json({
      success: true,
      code: 0,
      data: carpoolInfoList
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

carpoolInfoListController.searchCarpoolInfoList = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10
  };
  var carpoolTime = req.body.carpoolTime ? new Date(req.body.carpoolTime) : null;
  var carpoolDate = req.body.carpoolTime ? new Date(new Date(req.body.carpoolTime).setDate(new Date(req.body.carpoolTime).getDate() + 1)) : null;
  req.body.minPrice = req.body.minPrice ? parseInt(req.body.minPrice) : null;
  req.body.maxPrice = req.body.maxPrice ? parseInt(req.body.maxPrice) : null;

  _carpoolInfoList["default"].find(req.body.keyword ? {
    $or: [{
      user_id: eval("/".concat(req.body.keyword, "/i"))
    }, {
      username: eval("/".concat(req.body.keyword, "/i"))
    }, {
      fromCity: eval("/".concat(req.body.keyword, "/i"))
    }, {
      toCity: eval("/".concat(req.body.keyword, "/i"))
    }, {
      price: eval("/".concat(req.body.keyword, "/i"))
    }, {
      wholePrice: eval("/".concat(req.body.keyword, "/i"))
    }, {
      description: eval("/".concat(req.body.keyword, "/i"))
    }, {
      contact: eval("/".concat(req.body.keyword, "/i"))
    }, {
      phoneNumber: eval("/".concat(req.body.keyword, "/i"))
    }, {
      weixin: eval("/".concat(req.body.keyword, "/i"))
    }]
  } : {
    $and: [req.body.fromCity ? {
      fromCity: eval("/".concat(req.body.fromCity, "/i"))
    } : {}, req.body.toCity ? {
      toCity: eval("/".concat(req.body.toCity, "/i"))
    } : {}, {
      $and: [carpoolTime ? {
        $and: [{
          carpoolTime: {
            $lt: carpoolDate
          }
        }, {
          carpoolTime: {
            $gt: carpoolTime
          }
        }]
      } : {}, {
        carpoolTime: {
          $gt: new Date()
        }
      }]
    }, req.body.minPrice ? {
      price: {
        $gt: req.body.minPrice
      }
    } : {}, req.body.maxPrice ? {
      price: {
        $lt: req.body.maxPrice
      }
    } : {}, req.body.seatNumb ? {
      seatNumb: {
        $gt: req.body.seatNumb
      }
    } : {}]
  }).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (carpoolInfoList) {
    return res.json({
      success: true,
      code: 0,
      data: carpoolInfoList
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

carpoolInfoListController.saveCarpoolInfo = function (req, res) {
  _user["default"].find({
    _id: req.user.id
  }).then(function (userInfo) {
    userInfo = userInfo[0];

    if (userInfo.saved_carpool.length > 0) {
      if (userInfo.saved_carpool.filter(function (i) {
        return i == req.body.carpool_id;
      }).length > 0) {
        userInfo.saved_carpool = userInfo.saved_carpool.remove(req.body.carpool_id);
      } else {
        userInfo.saved_carpool = userInfo.saved_carpool.concat(req.body.carpool_id);
      }
    } else {
      userInfo.saved_carpool = [req.body.carpool_id];
    }

    _user["default"].updateOne({
      _id: req.user.id
    }, {
      $set: {
        saved_carpool: userInfo.saved_carpool
      }
    }).then(function () {
      _user["default"].find({
        _id: req.user.id
      }).then(function (userInfo) {
        return res.json({
          success: true,
          code: 0,
          data: userInfo[0]
        });
      })["catch"](function (err) {
        return res.status(400).json("Error: " + err);
      });
    })["catch"](function (err) {
      return res.status(400).json("Error: " + err);
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

carpoolInfoListController.getSavedCarpoolList = function (req, res) {
  _carpoolInfoList["default"].find({
    _id: {
      $in: req.user.saved_carpool
    }
  }).then(function (carpoolInfo) {
    return res.json({
      success: true,
      code: 0,
      data: carpoolInfo
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

carpoolInfoListController.getMyCarpoolList = function (req, res) {
  _carpoolInfoList["default"].find({
    user_id: req.user.id
  }).then(function (carpoolInfo) {
    return res.json({
      success: true,
      code: 0,
      data: carpoolInfo
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

carpoolInfoListController.editMyCarpoolList = function (req, res) {
  _carpoolInfoList["default"].updateOne({
    _id: req.body._id
  }, {
    $set: req.body
  }).then(function (carpoolInfo) {
    return res.json({
      success: true,
      code: 0,
      data: carpoolInfo
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = carpoolInfoListController;
exports["default"] = _default;