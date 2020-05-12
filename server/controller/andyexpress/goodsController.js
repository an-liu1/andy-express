import Goods from "../../model/andyexpress/goods.model";
// import fs from "fs";
import mail from "../../config/sendEmail";

const goodsController = {};

// 用户输入待入库物品信息
goodsController.submitGoods = (req, res) => {
  req.body = {
    user_id: req.user.id,
    username: req.user.username,
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
  // let good_image = req.body.goodImg;
  // var base64Data = good_image.replace(/^data:image\/\w+;base64,/, "");
  // var dataBuffer = Buffer.from(base64Data, "base64");
  // let time = Date.now();
  // let imagePath = `images/andyexpress/goods/${req.user.id}_${time}.png`;
  // fs.writeFile(`./public/${imagePath}`, dataBuffer, function (err) {
  //   if (err) return;
  // });
  // req.body.goodImg = imagePath;
  req.body.isStorage = 1;
  // req.body.storageTime = new Date();
  req.body.goodStatus = "已入库";
  Goods.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((good) => {
      mail({
        from: "AndyExpress <AndyExpress.admin@andyexpress.andyliu.ca>",
        to: req.user.email,
        subject: "[AndyExpress]包裹入库通知",
        text: `尊敬的${req.user.username}，您好！您的货物 ${good.goodName} 已入库。本邮件由系统自动发出，请勿直接回复！`,
      });
      return res.json({
        success: true,
        code: 0,
        data: good,
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

// 后台提交退货信息和客户确认并付款
goodsController.submitReturnGoodsInfo = (req, res) => {
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

// 退货完成
goodsController.submitReturnGoods = (req, res) => {
  req.body.goodStatus = "已退货";
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
    .then((good) =>
      res.json({
        success: true,
        code: 0,
        data: good,
      })
    )
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
