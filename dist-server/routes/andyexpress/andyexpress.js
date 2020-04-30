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

var _announcementController = _interopRequireDefault(require("../../controller/andyexpress/announcementController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

// USER INTERFACE
//user
router.get("/getUserInfo", _userInfoController["default"].getUserInfo); // 获取个人信息

router.put("/updateUserInfo", _userInfoController["default"].updateUserInfo); // 更新个人信息

router.post("/avatarUpload", _userInfoController["default"].avatarUpload); //头像上传
//good

router.post("/goodSubmit", _goodsController["default"].submitGoods); //提交国内物流信息（未入库商品）

router.get("/goodGet/:status/:page/:size/:status1", _goodsController["default"].getGoods); // 获取用户所有未入库商品

router.post("/returnGoods", _goodsController["default"].returnGoods); // 用户提交退货地址

router.post("/searchGoodsForUser/:status/:page/:size/:status1", _goodsController["default"].searchGoodsForUser); //订单

router.post("/createOrderForm", _ordersController["default"].createOrderForm); //用户打包创建订单

router.get("/getOrderForm/:status/:page/:size/:status1/:status2", _ordersController["default"].getOrderForm); //获取客户所有订单

router.put("/orderDelivery", _ordersController["default"].orderDelivery); // 客户填写订单邮寄地址

router.put("/isDeliveryAndRank", _ordersController["default"].isDeliveryAndRank); //客户确定收货及评分

router.post("/searchOrdersForUser/:status/:page/:size/:status1/:status2", _ordersController["default"].searchOrdersForUser); //售后

router.post("/createAfterSale", _aftersaleController["default"].createAfterSale); //客户提交售后

router.get("/getUserAfterSale/:page/:size", _aftersaleController["default"].getUserAfterSale); //获取客户所有售后

router.get("/getAfterSale/:id", _aftersaleController["default"].getAfterSale); //具体某个客户售后

router.put("/conformAfterSale/:id", _aftersaleController["default"].conformAfterSale); //客户确认同意售后方案
//advice

router.post("/createAdvice", _advicesController["default"].createAdvice); // 客户提交投诉

router.get("/getUserAdvice/:page/:size", _advicesController["default"].getUserAdvice); //获取客户所有投诉

router.get("/getAdvice/:id", _advicesController["default"].getAdvice); //具体某个客户投诉
// ADMIN INTERFACE
//user

router.get("/getAllUser/:page/:size", _userInfoController["default"].getAllUser); // 后台获取所有用户信息
//good

router["delete"]("/goodDelete/:id", _goodsController["default"].deleteGoods);
router.put("/goodUpdate/:id", _goodsController["default"].updateGoods); // 入库商品信息填写

router.get("/getAllGoods/:status/:page/:size/:status1", _goodsController["default"].getAllGoods); // 获取所有商品

router.post("/submitReturnGoods", _goodsController["default"].submitReturnGoods); //客户发出快递填写退货商品单号及快递商，确认退货

router.post("/searchGoods/:status/:page/:size/:status1", _goodsController["default"].searchGoods); //搜索
//订单

router.put("/updateOrderForm/:id", _ordersController["default"].updateOrderForm); // 客服返回已打包订单详情

router.get("/getAllOrderForm/:status/:page/:size/:status1/:status2", _ordersController["default"].getAllOrderForm); //获取所有订单

router.put("/orderDelivering/:id", _ordersController["default"].orderDelivering); //客服返回订单号及成本初步统计

router.post("/searchOrders/:status/:page/:size/:status1/:status2", _ordersController["default"].searchOrders); //搜索
//售后

router.put("/solveAfterSale/:id", _aftersaleController["default"].solveAfterSale); // 客服反馈售后

router.get("/getAdminAfterSale/:page/:size", _aftersaleController["default"].getAdminAfterSale); //获取全部售后
//advice

router.get("/getAdminAdvice/:page/:size", _advicesController["default"].getAdminAdvice); //获取所有投诉

router.put("/updateAdvice/:id", _advicesController["default"].updateAdvice); //客服反馈建议
//公告与邮件

router.get("/getAdminAnnouncement/:page/:size", _announcementController["default"].getAdminAnnouncement); //获取所有公告

router.get("/getAAnnouncement/:id", _announcementController["default"].getAAnnouncement); //获取后台具体某条公告

router.post("/createAnnouncement", _announcementController["default"].createAnnouncement); //创建公告

router.put("/updateAnnouncement/:id", _announcementController["default"].updateAnnouncement); //修改公告

router["delete"]("/deleteAnnouncement/:id", _announcementController["default"].deleteAnnouncement); // 删除公告

var _default = router;
exports["default"] = _default;