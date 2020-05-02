import AfterSale from "../../model/andyexpress/aftersale.model";
import OrderForm from "../../model/andyexpress/orderForm.model";
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
  AfterSale.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((after) => {
      OrderForm.updateOne(
        { _id: req.body.order_id },
        {
          $set: {
            compensation: req.body.compensation,
          },
        }
      );
      //加邮件反馈给客户
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
