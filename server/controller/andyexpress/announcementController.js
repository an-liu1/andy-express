import Announcement from "../../model/andyexpress/announcement.model";

const announcementController = {};

// 创建公告
announcementController.createAnnouncement = (req, res) => {
  Announcement.create(req.body)
    .then((announcement) =>
      res.json({
        success: true,
        code: 0,
        data: announcement,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

//公告修改
announcementController.updateAnnouncement = (req, res) => {
  Announcement.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((announcement) => {
      return res.json({
        success: true,
        code: 0,
        data: announcement,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

// 后台所有公告
announcementController.getAdminAnnouncement = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  Announcement.find()
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((announcement) =>
      res.json({
        success: true,
        code: 0,
        data: announcement,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

// 后台具体某条公告
announcementController.getAAnnouncement = (req, res) => {
  Announcement.find({ _id: req.params.id })
    .then((announcement) =>
      res.json({
        success: true,
        code: 0,
        data: announcement,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

announcementController.deleteAnnouncement = (req, res) => {
  Announcement.findByIdAndDelete(req.params.id)
    .then((announcement) =>
      res.json({
        success: true,
        code: 0,
        data: announcement,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

export default announcementController;
