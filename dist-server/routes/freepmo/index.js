"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _authController = _interopRequireDefault(require("../../controller/freepmo/authController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/register", _authController["default"].userRegister);
router.post("/login", _authController["default"].userLogin);
router.get("/checkCode/:email/:code", _authController["default"].checkCode);
router.post("/requestReset", _authController["default"].requestReset);
router.post("/resetPassword", _authController["default"].resetPassword);
var _default = router;
exports["default"] = _default;