import AfterSale from "../../model/andyexpress/aftersale.model";
import fs from "fs";

const aftersaleController = {};

// 客户提交售后申请
aftersaleController.createAfterSale = (req, res) => {
  req.body.username = req.user.username;
  req.body.user_id = req.user.id;
  req.body.email = req.user.email;

  let imagePath = req.body.aftersale_image.map((i) => {
    var base64Data = i.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, "base64");
    let time = Date.now();
    let image = `images/andyexpress/aftersale/${req.user.id}_${time}.png`;
    fs.writeFile(`./public/${image}`, dataBuffer, function (err) {
      if (err) return;
    });
    return image;
  });

  req.body.aftersale_image = imagePath;
  req.body.is_solve = 0;
  req.body.compensation = "";

  AfterSale.create(req.body)
    .then((after) =>
      //加邮件提示已成功
      res.json({
        success: true,
        code: 0,
        data: after,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客服反馈售后
aftersaleController.solveAfterSale = (req, res) => {
  req.body.is_solve = 1;
  AfterSale.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((after) => {
      //加邮件反馈给客户
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
  AfterSale.find({ user_id: req.user.id })
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
  AfterSale.find()
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
