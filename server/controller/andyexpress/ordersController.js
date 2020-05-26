import OrderForm from "../../model/andyexpress/orderForm.model";
import Goods from "../../model/andyexpress/goods.model";
import Announcement from "../../model/andyexpress/announcement.model";
import mail from "../../config/sendEmail";
// import fs from "fs";

const ordersController = {};

// 后台获取所有订单信息
ordersController.getOrderListNumber = (req, res) => {
  OrderForm.find()
    .then((order) => {
      let incomeList = [];
      let profitList = [];
      let compensationList = [];
      order
        .filter((i) => i.orderStatus === "已签收")
        .map((i) => {
          incomeList.push(i.incomePrice);
          profitList.push(i.incomePrice - i.costPrice);
          if (i.compensation) {
            compensationList.push(i.compensation);
          }
        });
      let totalIncome = incomeList.reduce((tmp, item) => {
        return tmp + item;
      });
      let totalProfit = profitList.reduce((tmp, item) => {
        return tmp + item;
      });
      let totalCompensation = compensationList.reduce((tmp, item) => {
        return tmp + item;
      });

      return res.json({
        success: true,
        code: 0,
        data: {
          orderNumber: order.length,
          totalIncome: totalIncome,
          totalProfit: totalProfit - totalCompensation,
          totalCompensation: totalCompensation,
        },
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 用户打包订单
ordersController.createOrderForm = (req, res) => {
  req.body.user_id = req.user.id;
  req.body.username = req.user.username;
  req.body.email = req.user.email;
  req.body.orderStatus = "待打包";
  OrderForm.create(req.body)
    .then((order) => {
      //加邮件通知客户
      req.body.orderGoodsList.map((i) => {
        Goods.updateOne(
          { _id: i.goodId },
          { $set: { goodStatus: "待打包" } }
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

// 用户取消订单
ordersController.cancleOrderForm = (req, res) => {
  OrderForm.updateOne(
    { _id: req.params.id },
    { $set: { orderStatus: "已取消" } }
  )
    .then((order) => {
      req.body.orderGoodsList.map((i) => {
        Goods.updateOne(
          { _id: i.goodId },
          { $set: { goodStatus: "已入库" } }
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

// 客服获取全部已取消且付费订单
ordersController.getPaiedCancleOrderForm = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  OrderForm.find({
    orderStatus: "已取消",
    cancleFee: { $gt: 0 },
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((order) =>
      res.json({
        success: true,
        code: 0,
        data: order,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客服上传订单详情
ordersController.updateOrderForm = (req, res) => {
  req.body.orderStatus = "已打包";
  OrderForm.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((order) => {
      //加发送邮件提醒订单已生成
      OrderForm.find({ _id: req.params.id }).then((order1) => {
        var getEmailContent = (emailContent) => {
          emailContent.content = emailContent.content.replace(
            "$username$",
            order1[0].username
          );
          emailContent.content = emailContent.content.replace(
            "$_id$",
            order1[0]._id
          );
          mail({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: order1[0].email,
            subject: emailContent.summary,
            html: emailContent.content,
          });
        };
        Announcement.find({ title: "打包完成通知" }).then((announcements) => {
          getEmailContent(announcements[0]);
        });
      });
      req.body.goodsLists.map((i) => {
        Goods.updateOne(
          { _id: i },
          {
            $set: {
              goodStatus: "已打包",
              isPackage: 1,
              packageTime: req.body.packageTime,
            },
          }
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
  req.body.map((i) => {
    i.orderStatus = "待发货";
    OrderForm.updateOne({ _id: i.orderId }, { $set: i })
      .then((order) => {
        return res.json({
          success: true,
          code: 0,
          data: order,
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

// 客服填写订单物流信息详情
ordersController.orderDelivering = (req, res) => {
  req.body.orderStatus = "已发货";
  OrderForm.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((order) => {
      OrderForm.find({ _id: req.params.id }).then((order1) => {
        var getEmailContent = (emailContent) => {
          emailContent.content = emailContent.content.replace(
            "$username$",
            order1[0].username
          );
          emailContent.content = emailContent.content.replace(
            "$_id$",
            order1[0]._id
          );
          mail({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: order1[0].email,
            subject: emailContent.summary,
            html: emailContent.content,
          });
        };
        Announcement.find({ title: "订单发货通知" }).then((announcements) => {
          getEmailContent(announcements[0]);
        });
      });
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
  req.body.map((i) => {
    i.isDelivery = 1;
    i.orderStatus = "已签收";
    OrderForm.updateOne({ _id: i.id }, { $set: i })
      .then((order) => {
        return res.json({
          success: true,
          code: 0,
          data: order,
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

// 后台获取所有订单信息
ordersController.getAllOrderForm = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  OrderForm.find({
    $or: [
      { orderStatus: req.params.status },
      { orderStatus: req.params.status1 },
      { orderStatus: req.params.status2 },
    ],
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
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
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  OrderForm.find({
    $or: [
      { orderStatus: req.params.status },
      { orderStatus: req.params.status1 },
      { orderStatus: req.params.status2 },
    ],
    user_id: req.user.id,
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((order) =>
      res.json({
        success: true,
        code: 0,
        data: order,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

ordersController.searchOrders = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  OrderForm.find({
    $or: [
      { user_id: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { orderShippingNumber: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
    ],
    orderStatus: {
      $in: [req.params.status, req.params.status1, req.params.status2],
    },
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((orders) =>
      res.json({
        success: true,
        code: 0,
        data: orders,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

ordersController.searchOrdersForUser = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  OrderForm.find({
    $or: [
      { user_id: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { orderShippingNumber: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
    ],
    user_id: req.user.id,
    orderStatus: {
      $in: [req.params.status, req.params.status1, req.params.status2],
    },
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((orders) =>
      res.json({
        success: true,
        code: 0,
        data: orders,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

export default ordersController;
