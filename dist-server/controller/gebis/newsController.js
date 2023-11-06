"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _news = _interopRequireDefault(require("../../model/gebis/news.model"));

var _home = _interopRequireDefault(require("../../model/gebis/home.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var newsController = {};

newsController.getNewsList = function (req, res) {
  _news["default"].find({
    isDeleted: false
  }).sort({
    updatedAt: "desc"
  }).then(function (news) {
    return res.json({
      success: true,
      code: 0,
      data: news
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

newsController.createNews = function (req, res) {
  req.body.creator = req.user.name;
  req.body.creator_id = req.user.id;

  _news["default"].create(req.body).then(function () {
    return res.json({
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

newsController.getAllNews = function (req, res) {
  _news["default"].find().sort({
    isDeleted: "asc"
  }).sort({
    updatedAt: "desc"
  }).then(function (news) {
    return res.json({
      success: true,
      code: 0,
      data: news
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

newsController.deleteNews = function (req, res) {
  _news["default"].findOneAndUpdate({
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

newsController.getNews = function (req, res) {
  _news["default"].find({
    _id: req.params.id
  }).then(function (news) {
    return res.json({
      success: true,
      code: 0,
      data: news[0]
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

newsController.updateNews = function (req, res) {
  _news["default"].findOneAndUpdate({
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

newsController.getHomeInfo = function (req, res) {
  _home["default"].find().then(function (home) {
    return res.json({
      success: true,
      code: 0,
      data: home[0]
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

newsController.updateHomeInfo = function (req, res) {
  _home["default"].findOneAndUpdate({
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

var _default = newsController;
exports["default"] = _default;