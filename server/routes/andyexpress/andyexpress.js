import express from "express";
var router = express.Router();
import goodsController from "../../controller/andyexpress/goodsController";
import userInfoController from "../../controller/andyexpress/userInfoController";
import advicesController from "../../controller/andyexpress/advicesController";
import ordersController from "../../controller/andyexpress/ordersController";
import aftersaleController from "../../controller/andyexpress/aftersaleController";
import announcementController from "../../controller/andyexpress/announcementController";

// USER INTERFACE

//user
router.get("/getUserInfo", userInfoController.getUserInfo); // 获取个人信息
router.put("/updateUserInfo", userInfoController.updateUserInfo); // 更新个人信息
router.post("/avatarUpload", userInfoController.avatarUpload); //头像上传

//good
router.post("/goodSubmit", goodsController.submitGoods); //提交国内物流信息（未入库商品）
router.get("/goodGet/:status/:page/:size/:status1", goodsController.getGoods); // 获取用户所有未入库商品
router.post("/returnGoods", goodsController.returnGoods); // 用户提交退货地址
router.post(
  "/searchGoodsForUser/:status/:page/:size/:status1",
  goodsController.searchGoodsForUser
);

//订单
router.post("/createOrderForm", ordersController.createOrderForm); //用户打包创建订单
router.get("/getOrderForm", ordersController.getOrderForm); //获取客户所有订单
router.put("/orderDelivery", ordersController.orderDelivery); // 客户填写订单邮寄地址
router.put("/isDeliveryAndRank", ordersController.isDeliveryAndRank); //客户确定收货及评分
router.post("/searchOrdersForUser", ordersController.searchOrdersForUser);

//售后
router.post("/createAfterSale", aftersaleController.createAfterSale); //客户提交售后
router.get("/getUserAfterSale", aftersaleController.getUserAfterSale); //获取客户所有售后
router.get("/getAfterSale/:id", aftersaleController.getAfterSale); //具体某个客户售后
router.put("/conformAfterSale/:id", aftersaleController.conformAfterSale);//客户确认同意售后方案

//advice
router.post("/createAdvice", advicesController.createAdvice); // 客户提交投诉
router.get("/getUserAdvice", advicesController.getUserAdvice); //获取客户所有投诉
router.get("/getAdvice/:id", advicesController.getAdvice); //具体某个客户投诉

// ADMIN INTERFACE

//user
router.get("/getAllUser", userInfoController.getAllUser); // 后台获取所有用户信息

//good
router.delete("/goodDelete/:id", goodsController.deleteGoods);
router.put("/goodUpdate/:id", goodsController.updateGoods); // 入库商品信息填写
router.get("/getAllGoods/:status/:page/:size", goodsController.getAllGoods); // 获取所有商品
router.post("/submitReturnGoods", goodsController.submitReturnGoods); //客户发出快递填写退货商品单号及快递商，确认退货
router.post("/searchGoods/:status/:page/:size", goodsController.searchGoods); //搜索

//订单
router.put("/updateOrderForm/:id", ordersController.updateOrderForm); // 客服返回已打包订单详情
router.get("/getAllOrderForm", ordersController.getAllOrderForm); //获取所有订单
router.put("/orderDelivering/:id", ordersController.orderDelivering); //客服返回订单号及成本初步统计
router.post("/searchOrders", ordersController.searchOrders); //搜索

//售后
router.put("/solveAfterSale/:id", aftersaleController.solveAfterSale); // 客服反馈售后
router.get("/getAdminAfterSale", aftersaleController.getAdminAfterSale); //获取全部售后

//advice
router.get("/getAdminAdvice", advicesController.getAdminAdvice); //获取所有投诉
router.put("/updateAdvice/:id", advicesController.updateAdvice); //客服反馈建议

//公告与邮件
router.get(
  "/getAdminAnnouncement",
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
