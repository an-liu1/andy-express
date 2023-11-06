"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../../controller/carpool/authController"));

var _carpoolInfoListController = _interopRequireDefault(require("../../controller/carpool/carpoolInfoListController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/setAPPOpenTimes", _authController["default"].setAPPOpenTimes);
router.post("/getOpenId", _authController["default"].getOpenId);
router.get("/getAPPStatistics", _authController["default"].getAPPStatistics);
router.post("/searchCarpoolInfoList/:page/:size", _carpoolInfoListController["default"].searchCarpoolInfoList);
var _default = router;
exports["default"] = _default;