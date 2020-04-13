"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _goodsController = _interopRequireDefault(require("../../controller/andyexpress/goodsController"));

var _userInfoController = _interopRequireDefault(require("../../controller/andyexpress/userInfoController"));

var _advicesController = _interopRequireDefault(require("../../controller/andyexpress/advicesController"));

var _ordersController = _interopRequireDefault(require("../../controller/andyexpress/ordersController"));

var _aftersaleController = _interopRequireDefault(require("../../controller/andyexpress/aftersaleController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

// USER INTERFACE
//user
router.get("/getUserInfo", _userInfoController["default"].getUserInfo);
router.put("/updateUserInfo", _userInfoController["default"].updateUserInfo);
router.post("/avatarUpload", _userInfoController["default"].avatarUpload); //good

router.post("/goodSubmit", _goodsController["default"].submitGoods);
router.get("/goodGet", _goodsController["default"].getGoods);
router.post("/returnGoods", _goodsController["default"].returnGoods); //订单

router.post("/createOrderForm", _ordersController["default"].createOrderForm);
router.get("/getOrderForm", _ordersController["default"].getOrderForm);
router.put("/orderDelivery/:id", _ordersController["default"].orderDelivery);
router.put("/isDeliveryAndRank/:id", _ordersController["default"].isDeliveryAndRank); //售后

router.post("/createAfterSale", _aftersaleController["default"].createAfterSale);
router.get("/getUserAfterSale", _aftersaleController["default"].getUserAfterSale);
router.get("/getAfterSale/:id", _aftersaleController["default"].getAfterSale); //advice

router.post("/createAdvice", _advicesController["default"].createAdvice);
router.get("/getUserAdvice", _advicesController["default"].getUserAdvice);
router.get("/getAdvice/:id", _advicesController["default"].getAdvice); // ADMIN INTERFACE
//user

router.get("/getAllUser", _userInfoController["default"].getAllUser); //good

router["delete"]("/goodDelete/:id", _goodsController["default"].deleteGoods);
router.put("/goodUpdate/:id", _goodsController["default"].updateGoods);
router.get("/getAllGoods", _goodsController["default"].getAllGoods);
router.post("/submitReturnGoods", _goodsController["default"].submitReturnGoods); //订单

router.put("/updateOrderForm/:id", _ordersController["default"].updateOrderForm);
router.get("/getAllOrderForm", _ordersController["default"].getAllOrderForm);
router.put("/orderDelivering/:id", _ordersController["default"].orderDelivering); //售后

router.put("/solveAfterSale/:id", _aftersaleController["default"].solveAfterSale);
router.get("/getAdminAfterSale", _aftersaleController["default"].getAdminAfterSale); //advice

router.get("/getAdminAdvice", _advicesController["default"].getAdminAdvice);
var _default = router;
exports["default"] = _default;