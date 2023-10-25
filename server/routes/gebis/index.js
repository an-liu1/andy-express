import express from "express";
var router = express.Router();
import userController from "../../controller/gebis/userController.js";
import bidClassController from "../../controller/gebis/bidClassController.js";
import bidItemController from "../../controller/gebis/bidItemController.js";
import newsController from "../../controller/gebis/newsController.js";

//user
router.post("/getOpenId", userController.getOpenId);

//bidClass
router.get("/getBidClassList", bidClassController.getBidClassList);
router.get("/getBidClass/:id", bidClassController.getBidClass);

//bidItem
router.get("/getBidItemByClass/:id", bidItemController.getBidItemByClass);

//news
router.get("/getNewsList", newsController.getNewsList);
router.get("/getNews/:id", newsController.getNews);

//home
router.get("/getHomeInfo", newsController.getHomeInfo);

export default router;
