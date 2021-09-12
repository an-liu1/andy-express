"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../../controller/carpool/authController"));

var _carpoolInfoListController = _interopRequireDefault(require("../../controller/carpool/carpoolInfoListController"));

var _adviceController = _interopRequireDefault(require("../../controller/carpool/adviceController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/getUserInfo", _authController["default"].getUserInfo);
router.post("/createCarpoolAds", _carpoolInfoListController["default"].createCarpoolAds);
router.post("/saveCarpoolInfo", _carpoolInfoListController["default"].saveCarpoolInfo);
router.get("/getSavedCarpoolList", _carpoolInfoListController["default"].getSavedCarpoolList);
router.get("/getMyCarpoolList", _carpoolInfoListController["default"].getMyCarpoolList);
router.post("/editMyCarpoolList", _carpoolInfoListController["default"].editMyCarpoolList);
router.post("/stickMyCarpoolList", _carpoolInfoListController["default"].stickMyCarpoolList);
router.post("/endCarpoolTrip", _carpoolInfoListController["default"].endCarpoolTrip);
router.post("/createNewAdvice", _adviceController["default"].createNewAdvice);
router.get("/getMyAdvice", _adviceController["default"].getMyAdvice);
var _default = router;
exports["default"] = _default;