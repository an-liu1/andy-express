"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _minderController = _interopRequireDefault(require("../../controller/freepmo/minderController"));

var _pmoUserInfoController = _interopRequireDefault(require("../../controller/freepmo/pmoUserInfoController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

//user router
router.get("/getUserInfo", _pmoUserInfoController["default"].getUserInfo);
router.put("/updateUserInfo", _pmoUserInfoController["default"].updateUserInfo);
router.post("/avatarUpload", _pmoUserInfoController["default"].avatarUpload); // minder router

router.get("/minderGetAll", _minderController["default"].getAllMinder);
router.get("/minderGetExample", _minderController["default"].getExampleMinder);
router.post("/minderSet", _minderController["default"].setMinder);
router.get("/minderGet/:minderId", _minderController["default"].getMinder);
router.put("/minderUpdate/:minderId", _minderController["default"].updateMinder);
router["delete"]("/minderDelete/:minderId", _minderController["default"].deleteMinder); //image upload
// router.post("/imageUpload", pmoUserInfoController.imageUpload);

var _default = router;
exports["default"] = _default;