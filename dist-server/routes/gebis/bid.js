"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userController = _interopRequireDefault(require("../../controller/gebis/userController.js"));

var _bidClassController = _interopRequireDefault(require("../../controller/gebis/bidClassController.js"));

var _bidItemController = _interopRequireDefault(require("../../controller/gebis/bidItemController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

//user
router.get("/getUserInfo", _userController["default"].getUserInfo);
router.post("/updateUserInfo", _userController["default"].updateUserInfo);
router.post("/collectBidItem", _userController["default"].collectBidItem); //bidClass

router.post("/createBidClass", _bidClassController["default"].createBidClass);
router.get("/getAllBidClass", _bidClassController["default"].getAllBidClass);
router.post("/deleteBidClass", _bidClassController["default"].deleteBidClass);
router.post("/updateBidClass", _bidClassController["default"].updateBidClass); //bidItem

router.post("/createBidItem", _bidItemController["default"].createBidItem);
router.post("/deleteBidItem", _bidItemController["default"].deleteBidItem);
router.get("/getBidItem/:id", _bidItemController["default"].getBidItem);
router.post("/updateBidItem", _bidItemController["default"].updateBidItem);
router.get("/getMyBidCollection", _bidItemController["default"].getMyBidCollection);
router.get("/getMyBidItem", _bidItemController["default"].getMyBidItem);
router.post("/getExportList", _bidItemController["default"].getExportList);
var _default = router;
exports["default"] = _default;