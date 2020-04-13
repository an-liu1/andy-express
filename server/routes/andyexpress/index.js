import express from "express";
var router = express.Router();
import authController from "../../controller/andyexpress/authController";

router.post("/register", authController.userRegister);
router.post("/login", authController.userLogin);
router.get("/checkCode/:email/:code", authController.checkCode);
router.post("/requestReset", authController.requestReset);
router.post("/resetPassword", authController.resetPassword);

export default router;
