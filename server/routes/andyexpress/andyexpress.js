import express from "express";
var router = express.Router();
import goodsController from "../../controller/andyexpress/goodsController";
import userInfoController from "../../controller/andyexpress/userInfoController";
import advicesController from "../../controller/andyexpress/advicesController";
import ordersController from "../../controller/andyexpress/ordersController";
import aftersaleController from "../../controller/andyexpress/aftersaleController";
import announcementController from "../../controller/andyexpress/announcementController";
import dataController from "../../controller/andyexpress/dataController";

// USER INTERFACE

router.get("/getUpToken/:uploadTime", userInfoController.getUpToken);

//user
router.get("/getUserInfo", userInfoController.getUserInfo); // 获取个人信息
router.put("/updateUserInfo", userInfoController.updateUserInfo); // 更新个人信息
router.post("/avatarUpload", userInfoController.avatarUpload); //头像上传
router.put("/rechargeAccount", userInfoController.rechargeAccount); //充值
router.put("/payFromAccount", userInfoController.payFromAccount); //付款

//good
router.post("/goodSubmit", goodsController.submitGoods); //提交国内物流信息（未入库商品）
router.put("/userUpdateGoods/:id", goodsController.userUpdateGoods); // 客户更新待入库信息
router.get("/goodGet/:status/:page/:size/:status1", goodsController.getGoods); // 获取用户所有未入库商品
router.put("/returnGoods", goodsController.returnGoods); // 用户提交退货地址
router.post(
  "/searchGoodsForUser/:status/:page/:size/:status1",
  goodsController.searchGoodsForUser
);
router.put("/cancleReturnGoods/:id", goodsController.cancleReturnGoods); //用户取消退货

//订单
router.post("/createOrderForm", ordersController.createOrderForm); //用户打包创建订单
router.get(
  "/getOrderForm/:status/:page/:size/:status1/:status2",
  ordersController.getOrderForm
); //获取客户所有订单
router.put("/orderDelivery", ordersController.orderDelivery); // 客户填写订单邮寄地址
router.put("/isDeliveryAndRank", ordersController.isDeliveryAndRank); //客户确定收货及评分
router.post(
  "/searchOrdersForUser/:status/:page/:size/:status1/:status2",
  ordersController.searchOrdersForUser
);
router.put("/cancleOrderForm/:id", ordersController.cancleOrderForm); //用户取消订单

//售后
router.post("/createAfterSale", aftersaleController.createAfterSale); //客户提交售后
router.get(
  "/getUserAfterSale/:page/:size",
  aftersaleController.getUserAfterSale
); //获取客户所有售后
router.get("/getAfterSale/:id", aftersaleController.getAfterSale); //具体某个客户售后
router.put("/conformAfterSale/:id", aftersaleController.conformAfterSale); //客户确认同意售后方案

//advice
router.post("/createAdvice", advicesController.createAdvice); // 客户提交投诉
router.get("/getUserAdvice/:page/:size", advicesController.getUserAdvice); //获取客户所有投诉
router.get("/getAdvice/:id", advicesController.getAdvice); //具体某个客户投诉

// ADMIN INTERFACE

//data
router.put("/getDataAnalysis", dataController.getDataAnalysis);

//user
router.get("/getAllUser/:page/:size", userInfoController.getAllUser); // 后台获取所有用户信息
router.post("/searchUser/:page/:size", userInfoController.searchUser); // 后台搜索所有用户信息
router.get("/getUserNumber", userInfoController.getUserNumber); // 后台获取所有用户数量

//good
router.delete("/goodDelete/:id", goodsController.deleteGoods);
router.put("/goodUpdate/:id", goodsController.updateGoods); // 入库商品信息填写
router.get(
  "/getAllGoods/:status/:page/:size/:status1/:status2",
  goodsController.getAllGoods
); // 获取所有商品
router.put("/submitReturnGoodsInfo", goodsController.submitReturnGoodsInfo); // 后台提交退货信息和客户确认并付款
router.put("/submitReturnGoods", goodsController.submitReturnGoods); //客户发出快递填写退货商品单号及快递商，确认退货
router.post(
  "/searchGoods/:status/:page/:size/:status1/:status2",
  goodsController.searchGoods
); //搜索

//订单
router.put("/updateOrderForm/:id", ordersController.updateOrderForm); // 客服返回已打包订单详情
router.get(
  "/getAllOrderForm/:status/:page/:size/:status1/:status2",
  ordersController.getAllOrderForm
); //获取所有订单
router.put("/orderDelivering/:id", ordersController.orderDelivering); //客服返回订单号及成本初步统计
router.post(
  "/searchOrders/:status/:page/:size/:status1/:status2",
  ordersController.searchOrders
); //搜索
router.get("/getOrderListNumber", ordersController.getOrderListNumber); // 后台获取所有订单数量

//售后
router.put("/solveAfterSale/:id", aftersaleController.solveAfterSale); // 客服反馈售后
router.get(
  "/getAdminAfterSale/:page/:size",
  aftersaleController.getAdminAfterSale
); //获取全部售后
router.post(
  "/searchAdminAfterSale/:page/:size",
  aftersaleController.searchAdminAfterSale
); //获取搜索全部售后

//advice
router.get("/getAdminAdvice/:page/:size", advicesController.getAdminAdvice); //获取所有投诉
router.put("/updateAdvice/:id", advicesController.updateAdvice); //客服反馈建议
router.post(
  "/searchAdminAdvice/:page/:size",
  advicesController.searchAdminAdvice
); //获取搜索所有投诉

//公告与邮件
router.get(
  "/getAdminAnnouncement/:page/:size",
  announcementController.getAdminAnnouncement
); //获取所有公告
router.get("/getAAnnouncement/:id", announcementController.getAAnnouncement); //获取后台具体某条公告
router.post("/createAnnouncement", announcementController.createAnnouncement); //创建公告
router.put(
  "/updateAnnouncement/:id",
  announcementController.updateAnnouncement
); //修改公告
router.delete(
  "/deleteAnnouncement/:id",
  announcementController.deleteAnnouncement
); // 删除公告

export default router;
