import express from "express";
var router = express.Router();
import newsController from "../../controller/gebis/newsController.js";

//news
router.post("/createNews", newsController.createNews);
router.get("/getAllNews", newsController.getAllNews);
router.post("/deleteNews", newsController.deleteNews);
router.post("/updateNews", newsController.updateNews);

//home
router.post("/updateHomeInfo", newsController.updateHomeInfo);

export default router;
