import Advices from "../../model/andyexpress/advices.model";
import fs from "fs";

const advicesController = {};

// 用户发起投诉申请
advicesController.createAdvice = (req, res) => {
  let imagePath = req.body.evident_image.map((i) => {
    var base64Data = i.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = Buffer.from(base64Data, "base64");
    let time = Date.now();
    let image = `images/andyexpress/advices/${req.user.id}-${time}.png`;
    fs.writeFile(`./public/${image}`, dataBuffer, function (err) {
      if (err) return;
    });
    return image;
  });

  let advice = {
    usernam: req.user.username,
    user_id: req.user.id,
    email: req.user.email,
    advice_title: req.body.advice_title,
    advice_content: req.body.advice_content,
    evident_image: imagePath,
  };

  Advices.create(advice)
    .then((advice) =>
      res.json({
        success: true,
        code: 0,
        data: advice,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 具体投诉详情
advicesController.getAdvice = (req, res) => {
  Advices.find({ _id: req.params.id })
    .then((advice) =>
      res.json({
        success: true,
        code: 0,
        data: advice,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客户所有投诉
advicesController.getUserAdvice = (req, res) => {
  Advices.find({ user_id: req.user.id })
    .then((advice) =>
      res.json({
        success: true,
        code: 0,
        data: advice,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 后台所有投诉
advicesController.getAdminAdvice = (req, res) => {
  Advices.find()
    .then((advice) =>
      res.json({
        success: true,
        code: 0,
        data: advice,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

export default advicesController;
