"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _newsController = _interopRequireDefault(require("../../controller/gebis/newsController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

//news
router.post("/createNews", _newsController["default"].createNews);
router.get("/getAllNews", _newsController["default"].getAllNews);
router.post("/deleteNews", _newsController["default"].deleteNews);
router.post("/updateNews", _newsController["default"].updateNews); //home

router.post("/updateHomeInfo", _newsController["default"].updateHomeInfo);
var _default = router;
exports["default"] = _default;