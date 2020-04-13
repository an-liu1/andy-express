import OrderForm from "../../model/andyexpress/orderForm.model";
import Goods from "../../model/andyexpress/goods.model";
import fs from "fs";

const ordersController = {};

// 用户打包订单
ordersController.createOrderForm = (req, res) => {
  req.body.user_id = req.user.id;
  req.body.username = req.user.username;
  req.body.orderStatus = "待打包";
  OrderForm.create(req.body)
    .then((order) => {
      //加邮件通知客户
      req.body.orderGoodsList.map((i) => {
        Goods.updateOne(
          { _id: i.goodId },
          { $set: { orderStatus: "待打包" } }
        ).catch((err) => res.status(400).json("Error: " + err));
      });
      return res.json({
        success: true,
        code: 0,
        data: order,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客服上传商品详情
ordersController.updateOrderForm = (req, res) => {
  let order_Img = req.body.orderImg;
  var base64Data = order_Img.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = Buffer.from(base64Data, "base64");
  let time = Date.now();
  let imagePath = `images/andyexpress/goods/${req.user.id}-${time}.png`;
  fs.writeFile(`./public/${imagePath}`, dataBuffer, function (err) {
    if (err) return;
  });
  req.body.orderImg = imagePath;
  req.body.orderStatus = "已打包";

  OrderForm.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((order) => {
      //加发送邮件提醒订单已生成
      order.orderGoodsList.map((i) => {
        Goods.updateOne(
          { _id: i.goodId },
          { $set: { orderStatus: "已打包", isPackage: 1, packageTime: time } }
        ).catch((err) => res.status(400).json("Error: " + err));
      });
      return res.json({
        success: true,
        code: 0,
        data: order,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客户填写邮寄地址等待发货
ordersController.orderDelivery = (req, res) => {
  req.body.orderStatus = "待发货";
  OrderForm.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((order) => {
      return res.json({
        success: true,
        code: 0,
        data: order,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客服填写订单物流信息详情
ordersController.orderDelivering = (req, res) => {
  req.body.orderStatus = "已发货";
  OrderForm.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((order) => {
      return res.json({
        success: true,
        code: 0,
        data: order,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客户确认完成订单并评价
ordersController.isDeliveryAndRank = (req, res) => {
  req.body.isDelivery = 1;
  req.body.orderStatus = "已签收";
  OrderForm.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((order) => {
      return res.json({
        success: true,
        code: 0,
        data: order,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 后台获取所有订单信息
ordersController.getAllOrderForm = (req, res) => {
  OrderForm.find()
    .then((order) =>
      res.json({
        success: true,
        code: 0,
        data: order,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 用户获取订单信息
ordersController.getOrderForm = (req, res) => {
  OrderForm.find({ user_id: req.user.id })
    .then((order) =>
      res.json({
        success: true,
        code: 0,
        data: order,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

export default ordersController;
