"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _advices = _interopRequireDefault(require("../../model/andyexpress/advices.model"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var advicesController = {}; // 用户发起投诉申请

advicesController.createAdvice = function (req, res) {
  var imagePath = req.body.evident_image.map(function (i) {
    var base64Data = i.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, "base64");
    var time = Date.now();
    var image = "images/andyexpress/advices/".concat(req.user.id, "_").concat(time, ".png");

    _fs["default"].writeFile("./public/".concat(image), dataBuffer, function (err) {
      if (err) return;
    });

    return image;
  });
  var advice = {
    usernam: req.user.username,
    user_id: req.user.id,
    email: req.user.email,
    advice_title: req.body.advice_title,
    advice_type: req.body.advice_type,
    advice_content: req.body.advice_content,
    evident_image: imagePath
  };

  _advices["default"].create(advice).then(function (advice) {
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

  _advices["default"].find().skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (advice) {
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
      _id: eval("/".concat(req.body.searchString, "/i"))
    }, {
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