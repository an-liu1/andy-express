import express from "express";
var router = express.Router();
import authController from "../../controller/carpool/authController";
import carpoolListController from "../../controller/carpool/carpoolInfoListController";

router.get("/setAPPOpenTimes", authController.setAPPOpenTimes);
router.post("/getOpenId", authController.getOpenId);
router.get("/getAPPStatistics", authController.getAPPStatistics);
router.post(
  "/searchCarpoolInfoList/:page/:size",
  carpoolListController.searchCarpoolInfoList
);

export default router;
