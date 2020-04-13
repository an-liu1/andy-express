import express from "express";
var router = express.Router();
import minderController from "../../controller/freepmo/minderController";
import pmoUserInfoController from "../../controller/freepmo/pmoUserInfoController";

//user router
router.get("/getUserInfo", pmoUserInfoController.getUserInfo);
router.put("/updateUserInfo", pmoUserInfoController.updateUserInfo);
router.post("/avatarUpload", pmoUserInfoController.avatarUpload);


// minder router
router.get("/minderGetAll", minderController.getAllMinder);
router.get("/minderGetExample", minderController.getExampleMinder);
router.post("/minderSet", minderController.setMinder);
router.get("/minderGet/:minderId", minderController.getMinder);
router.put("/minderUpdate/:minderId", minderController.updateMinder);
router.delete("/minderDelete/:minderId", minderController.deleteMinder);

//image upload
// router.post("/imageUpload", pmoUserInfoController.imageUpload);

export default router;
