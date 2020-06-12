import AfterSale from "../../model/andyexpress/aftersale.model";
import OrderForm from "../../model/andyexpress/orderForm.model";
import mail from "../../config/sendEmail";
import Announcement from "../../model/andyexpress/announcement.model";
// import fs from "fs";

const aftersaleController = {};

// 客户提交售后申请
aftersaleController.createAfterSale = (req, res) => {
  req.body.username = req.user.username;
  req.body.user_id = req.user.id;
  req.body.email = req.user.email;
  req.body.is_solve = 0;
  req.body.compensation = "";

  AfterSale.create(req.body)
    .then((after) => {
      OrderForm.updateOne(
        { _id: req.body.order_id },
        {
          $set: {
            is_aftersale: true,
          },
        }
      ).catch((err) => res.status(400).json("Error: " + err));
      //加邮件提示已成功
      OrderForm.find({ _id: req.body.order_id }).then((order1) => {
        var getEmailContent = (emailContent) => {
          emailContent.content = emailContent.content.replace(
            "$username$",
            order1[0].username
          );
          emailContent.content = emailContent.content.replace(
            "$orderId$",
            order1[0]._id
          );
          mail({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: order1[0].email,
            subject: emailContent.summary,
            html: emailContent.content,
          });
        };
        Announcement.find({ title: "售后提交通知" }).then((announcements) => {
          getEmailContent(announcements[0]);
        });
      });
      return res.json({
        success: true,
        code: 0,
        data: after,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客服反馈售后
aftersaleController.solveAfterSale = (req, res) => {
  AfterSale.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((after) => {
      OrderForm.updateOne(
        { _id: req.body.order_id },
        {
          $set: {
            compensation: req.body.compensation,
          },
        }
      ).catch((err) => res.status(400).json("Error: " + err));
      //加邮件反馈给客户
      OrderForm.find({ _id: req.body.order_id }).then((order1) => {
        var getEmailContent = (emailContent) => {
          emailContent.content = emailContent.content.replace(
            "$username$",
            order1[0].username
          );
          emailContent.content = emailContent.content.replace(
            "$orderId$",
            order1[0]._id
          );
          mail({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: order1[0].email,
            subject: emailContent.summary,
            html: emailContent.content,
          });
        };
        Announcement.find({ title: "售后反馈通知" }).then((announcements) => {
          getEmailContent(announcements[0]);
        });
      });
      return res.json({
        success: true,
        code: 0,
        data: after,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

//客户确认同意售后方案
aftersaleController.conformAfterSale = (req, res) => {
  req.body.is_solve = 1;
  AfterSale.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((after) => {
      return res.json({
        success: true,
        code: 0,
        data: after,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 售后信息详情
aftersaleController.getAfterSale = (req, res) => {
  AfterSale.find({ _id: req.params.id })
    .then((after) =>
      res.json({
        success: true,
        code: 0,
        data: after,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客户获取所有售后
aftersaleController.getUserAfterSale = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  AfterSale.find({ user_id: req.user.id })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((after) =>
      res.json({
        success: true,
        code: 0,
        data: after,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 后台获取所有售后
aftersaleController.getAdminAfterSale = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  AfterSale.find()
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((after) =>
      res.json({
        success: true,
        code: 0,
        data: after,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

aftersaleController.searchAdminAfterSale = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  AfterSale.find({
    $or: [
      { user_id: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { email: eval(`/${req.body.searchString}/i`) },
      { aftersale_title: eval(`/${req.body.searchString}/i`) },
      { aftersale_content: eval(`/${req.body.searchString}/i`) },
      { solution: eval(`/${req.body.searchString}/i`) },
      { compensation: eval(`/${req.body.searchString}/i`) },
    ],
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((after) =>
      res.json({
        success: true,
        code: 0,
        data: after,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

export default aftersaleController;
