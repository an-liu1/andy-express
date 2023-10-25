"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../../controller/gebis/userController.js"));

var _bidClassController = _interopRequireDefault(require("../../controller/gebis/bidClassController.js"));

var _bidItemController = _interopRequireDefault(require("../../controller/gebis/bidItemController.js"));

var _newsController = _interopRequireDefault(require("../../controller/gebis/newsController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

//user
router.post("/getOpenId", _userController["default"].getOpenId); //bidClass

router.get("/getBidClassList", _bidClassController["default"].getBidClassList);
router.get("/getBidClass/:id", _bidClassController["default"].getBidClass); //bidItem

router.get("/getBidItemByClass/:id", _bidItemController["default"].getBidItemByClass); //news

router.get("/getNewsList", _newsController["default"].getNewsList);
router.get("/getNews/:id", _newsController["default"].getNews); //home

router.get("/getHomeInfo", _newsController["default"].getHomeInfo);
var _default = router;
exports["default"] = _default;