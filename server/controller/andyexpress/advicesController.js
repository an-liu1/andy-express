import Advices from "../../model/andyexpress/advices.model";
import mail from "../../config/sendEmail";
import Announcement from "../../model/andyexpress/announcement.model";
// import fs from "fs";

const advicesController = {};

// 用户发起投诉申请
advicesController.createAdvice = (req, res) => {
  let advice = {
    usernam: req.user.username,
    user_id: req.user.id,
    email: req.user.email,
    advice_title: req.body.advice_title,
    advice_type: req.body.advice_type,
    advice_content: req.body.advice_content,
    evident_image: req.body.evident_image,
  };

  Advices.create(advice)
    .then((advice) => {
      var getEmailContent = (emailContent) => {
        emailContent.content = emailContent.content.replace(
          "$username$",
          req.user.username
        );
        mail({
          from: "AndyExpress <yvetteandyadmin@163.com>",
          to: req.user.email,
          subject: emailContent.summary,
          html: emailContent.content,
        });
      };
      Announcement.find({ title: "投诉提交通知" }).then((announcements) => {
        getEmailContent(announcements[0]);
      });
      return res.json({
        success: true,
        code: 0,
        data: advice,
      });
    })
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
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Advices.find({ user_id: req.user.id })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
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
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Advices.find()
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((advice) =>
      res.json({
        success: true,
        code: 0,
        data: advice,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 客服反馈建议
advicesController.updateAdvice = (req, res) => {
  Advices.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((advice) => {
      //加邮件反馈给客户
      Advices.find({ _id: req.params.id }).then((advice1) => {
        var getEmailContent = (emailContent) => {
          emailContent.content = emailContent.content.replace(
            "$username$",
            advice1[0].username
          );
          mail({
            from: "AndyExpress <yvetteandyadmin@163.com>",
            to: advice1[0].email,
            subject: emailContent.summary,
            html: emailContent.content,
          });
        };
        Announcement.find({ title: "投诉反馈通知" }).then((announcements) => {
          getEmailContent(announcements[0]);
        });
      });
      return res.json({
        success: true,
        code: 0,
        data: advice,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

advicesController.searchAdminAdvice = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Advices.find({
    $or: [
      { user_id: eval(`/${req.body.searchString}/i`) },
      { username: eval(`/${req.body.searchString}/i`) },
      { email: eval(`/${req.body.searchString}/i`) },
      { advice_title: eval(`/${req.body.searchString}/i`) },
      { advice_content: eval(`/${req.body.searchString}/i`) },
    ],
  })
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
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
