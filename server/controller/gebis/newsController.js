import news from "../../model/gebis/news.model";
import home from "../../model/gebis/home.model";

const newsController = {};

newsController.getNewsList = (req, res) => {
  news
    .find({ isDeleted: false })
    .sort({ updatedAt: "desc" })
    .then((news) => {
      return res.json({
        success: true,
        code: 0,
        data: news,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

newsController.createNews = (req, res) => {
  req.body.creator = req.user.name;
  req.body.creator_id = req.user.id;
  news
    .create(req.body)
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

newsController.getAllNews = (req, res) => {
  news
    .find()
    .sort({ isDeleted: "asc" })
    .sort({ updatedAt: "desc" })
    .then((news) => {
      return res.json({
        success: true,
        code: 0,
        data: news,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

newsController.deleteNews = (req, res) => {
  news
    .findOneAndUpdate(
      { _id: req.body.id },
      { $set: { isDeleted: req.body.isDeleted } }
    )
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

newsController.getNews = (req, res) => {
  news
    .find({ _id: req.params.id })
    .then((news) => {
      return res.json({
        success: true,
        code: 0,
        data: news[0],
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

newsController.updateNews = (req, res) => {
  news
    .findOneAndUpdate({ _id: req.body._id }, { $set: req.body })
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

newsController.getHomeInfo = (req, res) => {
  home
    .find()
    .then((home) => {
      return res.json({
        success: true,
        code: 0,
        data: home[0],
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

newsController.updateHomeInfo = (req, res) => {
  home
    .findOneAndUpdate({ _id: req.body._id }, { $set: req.body })
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default newsController;
