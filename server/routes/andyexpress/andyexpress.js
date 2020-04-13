import express from "express";
var router = express.Router();
import goodsController from "../../controller/andyexpress/goodsController";
import userInfoController from "../../controller/andyexpress/userInfoController";
import advicesController from "../../controller/andyexpress/advicesController";
import ordersController from "../../controller/andyexpress/ordersController";
import aftersaleController from "../../controller/andyexpress/aftersaleController";

// USER INTERFACE

//user
router.get("/getUserInfo", userInfoController.getUserInfo);
router.put("/updateUserInfo", userInfoController.updateUserInfo);
router.post("/avatarUpload", userInfoController.avatarUpload);

//good
router.post("/goodSubmit", goodsController.submitGoods);
router.get("/goodGet", goodsController.getGoods);
router.post("/returnGoods", goodsController.returnGoods);

//订单
router.post("/createOrderForm", ordersController.createOrderForm);
router.get("/getOrderForm", ordersController.getOrderForm);
router.put("/orderDelivery/:id", ordersController.orderDelivery);
router.put("/isDeliveryAndRank/:id", ordersController.isDeliveryAndRank);

//售后
router.post("/createAfterSale", aftersaleController.createAfterSale);
router.get("/getUserAfterSale", aftersaleController.getUserAfterSale);
router.get("/getAfterSale/:id", aftersaleController.getAfterSale);

//advice
router.post("/createAdvice", advicesController.createAdvice);
router.get("/getUserAdvice", advicesController.getUserAdvice);
router.get("/getAdvice/:id", advicesController.getAdvice);

// ADMIN INTERFACE

//user
router.get("/getAllUser", userInfoController.getAllUser);

//good
router.delete("/goodDelete/:id", goodsController.deleteGoods);
router.put("/goodUpdate/:id", goodsController.updateGoods);
router.get("/getAllGoods", goodsController.getAllGoods);
router.post("/submitReturnGoods", goodsController.submitReturnGoods);

//订单
router.put("/updateOrderForm/:id", ordersController.updateOrderForm);
router.get("/getAllOrderForm", ordersController.getAllOrderForm);
router.put("/orderDelivering/:id", ordersController.orderDelivering);

//售后
router.put("/solveAfterSale/:id", aftersaleController.solveAfterSale);
router.get("/getAdminAfterSale", aftersaleController.getAdminAfterSale);

//advice
router.get("/getAdminAdvice", advicesController.getAdminAdvice);

export default router;
