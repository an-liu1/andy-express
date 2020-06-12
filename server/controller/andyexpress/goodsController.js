import Goods from "../../model/andyexpress/goods.model";
// import fs from "fs";
import mail from "../../config/sendEmail";
import Announcement from "../../model/andyexpress/announcement.model";
import UserInfo from "../../model/andyexpress/userInfo.model";

const goodsController = {};

// 用户输入待入库物品信息
goodsController.submitGoods = (req, res) => {
  req.body = {
    user_id: req.user.id,
    username: req.user.username,
    email: req.user.email,
    goodName: req.body.goodName,
    localExpressNumber: req.body.localExpressNumber,
    localExpressCompany: req.body.localExpressCompany,
    isStorage: 0,
    isPackage: 0,
    goodStatus: "待入库",
  };
  Goods.create(req.body)
    .then((good) =>
      res.json({
        success: true,
        code: 0,
        data: good,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客户更新待入库信息
goodsController.userUpdateGoods = (req, res) => {
  Goods.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((good) => {
      return res.json({
        success: true,
        code: 0,
        data: good,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 后台更新进仓库物品信息
goodsController.updateGoods = (req, res) => {
  req.body.isStorage = 1;
  req.body.goodStatus = "已入库";
  Goods.updateOne({ _id: req.params.id }, { $set: req.body })
    .then(() => {
      Goods.find({ _id: req.params.id }).then((good) => {
        var getEmailContent = (emailContent) => {
          emailContent.content = emailContent.content.replace(
            "$username$",
            good[0].username
          );
          emailContent.content = emailContent.content.replace(
            "$goodName$",
            good[0].goodName
          );
          mail({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: good[0].email,
            subject: emailContent.summary,
            html: emailContent.content,
          });
        };
        Announcement.find({ title: "包裹入库通知" }).then((announcements) => {
          getEmailContent(announcements[0]);
        });
        return res.json({
          success: true,
          code: 0,
          data: good,
        });
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

goodsController.deleteGoods = (req, res) => {
  Goods.findByIdAndDelete(req.params.id)
    .then((good) =>
      res.json({
        success: true,
        code: 0,
        data: good,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 提交退货
goodsController.returnGoods = (req, res) => {
  req.body.goodStatus = "退货中";
  req.body.returnedGoods.map((i) => {
    Goods.updateOne({ _id: i }, { $set: req.body })
      .then((good) =>
        res.json({
          success: true,
          code: 0,
          data: good,
        })
      )
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

//用户取消退货
goodsController.cancleReturnGoods = (req, res) => {
  Goods.find({ _id: req.params.id }).then((good) => {
    if (good[0].IsPayed) {
      UserInfo.find({ user_id: req.user.id })
        .then((user) => {
          var newBalance = user[0].balance + good[0].returnShippingPrice;
          UserInfo.updateOne(
            { user_id: req.user.id },
            {
              $set: {
                balance: newBalance,
              },
            }
          ).catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
      Goods.updateOne(
        { _id: req.params.id },
        {
          $set: {
            returnBackPrice:
              good[0].returnBackPrice + good[0].returnShippingPrice,
          },
        }
      ).catch((err) => res.status(400).json("Error: " + err));
    }
  });
  Goods.updateOne(
    { _id: req.params.id },
    {
      $set: {
        goodStatus: "已入库",
        IsPayed: false,
        returnShippingPrice: "",
        returnShippingCostPrice: "",
        returnPayMethod: "",
      },
    }
  )
    .then((good) => {
      return res.json({
        success: true,
        code: 0,
        data: good,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 用户获取取消已付退货款物品
goodsController.getPayedReturnGoods = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Goods.find({
    $or: [{ returnBackPrice: { $gt: 0 } }, { goodStatus: "已退货" }],
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((good) => {
      res.json({
        success: true,
        code: 0,
        data: good,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 后台提交退货信息和客户确认并付款
goodsController.submitReturnGoodsInfo = (req, res) => {
  req.body.returnedGoods.map((i) => {
    Goods.updateOne({ _id: i }, { $set: req.body })
      .then((good) => {
        Goods.find({ _id: i }).then((good) => {
          var getEmailContent = (emailContent) => {
            emailContent.content = emailContent.content.replace(
              "$username$",
              good[0].username
            );
            emailContent.content = emailContent.content.replace(
              "$goodName$",
              good[0].goodName
            );
            mail({
              from: "AndyExpress <yvetteandyadmin@163.com>",
              to: good[0].email,
              subject: emailContent.summary,
              html: emailContent.content,
            });
          };
          Announcement.find({ title: "确认退货通知" }).then((announcements) => {
            getEmailContent(announcements[0]);
          });
        });
        return res.json({
          success: true,
          code: 0,
          data: good,
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

// 退货完成
goodsController.submitReturnGoods = (req, res) => {
  req.body.goodStatus = "已退货";
  req.body.returnedGoods.map((i) => {
    Goods.updateOne({ _id: i }, { $set: req.body })
      .then((good) => {
        Goods.find({ _id: i }).then((good) => {
          var getEmailContent = (emailContent) => {
            emailContent.content = emailContent.content.replace(
              "$username$",
              good[0].username
            );
            emailContent.content = emailContent.content.replace(
              "$goodName$",
              good[0].goodName
            );
            mail({
              from: "AndyExpress <yvetteandyadmin@163.com>",
              to: good[0].email,
              subject: emailContent.summary,
              html: emailContent.content,
            });
          };
          Announcement.find({ title: "退货完成通知" }).then((announcements) => {
            getEmailContent(announcements[0]);
          });
        });
        return res.json({
          success: true,
          code: 0,
          data: good,
        });
      })
      .catch((err) => res.status(400).json("Error: " + err));
  });
};

// 用户获取自己所有物品
goodsController.getGoods = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Goods.find({
    $or: [
      { goodStatus: req.params.status },
      { goodStatus: req.params.status1 },
    ],
    user_id: req.user.id,
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((good) => {
      res.json({
        success: true,
        code: 0,
        data: good,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 后台获取全部物品信息
goodsController.getAllGoods = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Goods.find({
    $or: [
      { goodStatus: req.params.status },
      { goodStatus: req.params.status1 },
      { goodStatus: req.params.status2 },
    ],
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((good) => {
      return res.json({
        success: true,
        code: 0,
        data: good,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

goodsController.searchGoods = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Goods.find({
    $or: [
      { user_id: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { localExpressNumber: eval(`/${req.body.searchString}/i`) },
      { goodName: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { note: eval(`/${req.body.searchString}/i`) },
      { returnExpressNumber: eval(`/${req.body.searchString}/i`) },
    ],
    goodStatus: {
      $in: [req.params.status, req.params.status1, req.params.status2],
    },
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((goods) =>
      res.json({
        success: true,
        code: 0,
        data: goods,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

goodsController.searchGoodsForUser = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Goods.find({
    $or: [
      { user_id: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { localExpressNumber: eval(`/${req.body.searchString}/i`) },
      { goodName: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { note: eval(`/${req.body.searchString}/i`) },
      { returnExpressNumber: eval(`/${req.body.searchString}/i`) },
    ],
    user_id: req.user.id,
    goodStatus: {
      $in: [req.params.status, req.params.status1],
    },
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((goods) =>
      res.json({
        success: true,
        code: 0,
        data: goods,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

export default goodsController;
