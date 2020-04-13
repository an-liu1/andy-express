"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _minder = _interopRequireDefault(require("../../model/freepmo/minder.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var minderController = {};

minderController.getAllMinder = function (req, res) {
  _minder["default"].find({
    userId: req.user.id
  }).then(function (minder) {
    return res.json({
      data: minder,
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

minderController.getExampleMinder = function (req, res) {
  _minder["default"].find({
    type: "default"
  }).then(function (minder) {
    return res.json({
      data: minder,
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

minderController.setMinder = function (req, res) {
  _minder["default"].findOne({
    projectName: req.body.projectName,
    userId: req.user.id
  }).then(function (minder) {
    if (minder) {
      return res.status(400).json("项目或分类脑图已存在,请更换项目名称！");
    } else {
      req.body.userId = req.user.id;

      _minder["default"].create(req.body).then(function (minder) {
        return res.json({
          data: minder,
          success: true,
          code: 0
        });
      })["catch"](function (err) {
        return res.status(400).json("Error: " + err);
      });
    }
  });
};

minderController.getMinder = function (req, res) {
  _minder["default"].find({
    _id: req.params.minderId
  }).then(function (minder) {
    return res.json({
      data: minder,
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

minderController.updateMinder = function (req, res) {
  _minder["default"].findOneAndUpdate({
    _id: req.params.minderId
  }, {
    $set: req.body
  }, {
    "new": true
  }).then(function (minder) {
    return res.json({
      data: minder,
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

minderController.deleteMinder = function (req, res) {
  _minder["default"].findOneAndRemove({
    _id: req.params.minderId
  }).then(function (minder) {
    return res.json({
      data: minder,
      success: true,
      code: 0
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = minderController;
exports["default"] = _default;