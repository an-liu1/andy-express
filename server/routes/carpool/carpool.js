import express from "express";
var router = express.Router();
import authController from "../../controller/carpool/authController";
import carpoolListController from "../../controller/carpool/carpoolInfoListController";
import adviceController from "../../controller/carpool/adviceController";

router.get("/getUserInfo", authController.getUserInfo);

router.post("/createCarpoolAds", carpoolListController.createCarpoolAds);
router.post("/saveCarpoolInfo", carpoolListController.saveCarpoolInfo);
router.get("/getSavedCarpoolList", carpoolListController.getSavedCarpoolList);
router.get("/getMyCarpoolList", carpoolListController.getMyCarpoolList);
router.post("/editMyCarpoolList", carpoolListController.editMyCarpoolList);

router.post("/createNewAdvice", adviceController.createNewAdvice);
router.get("/getMyAdvice", adviceController.getMyAdvice);

export default router;
