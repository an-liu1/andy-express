import express from "express";
var router = express.Router();
import userController from "../../controller/gebis/userController.js";
import bidClassController from "../../controller/gebis/bidClassController.js";
import bidItemController from "../../controller/gebis/bidItemController.js";

//user
router.get("/getUserInfo", userController.getUserInfo);
router.post("/updateUserInfo", userController.updateUserInfo);
router.post("/collectBidItem", userController.collectBidItem);

//bidClass
router.post("/createBidClass", bidClassController.createBidClass);
router.get("/getAllBidClass", bidClassController.getAllBidClass);
router.post("/deleteBidClass", bidClassController.deleteBidClass);
router.post("/updateBidClass", bidClassController.updateBidClass);

//bidItem
router.post("/createBidItem", bidItemController.createBidItem);
router.post("/deleteBidItem", bidItemController.deleteBidItem);
router.get("/getBidItem/:id", bidItemController.getBidItem);
router.post("/updateBidItem", bidItemController.updateBidItem);
router.get("/getMyBidCollection", bidItemController.getMyBidCollection);
router.get("/getMyBidItem", bidItemController.getMyBidItem);
router.post("/getExportList", bidItemController.getExportList);

export default router;
