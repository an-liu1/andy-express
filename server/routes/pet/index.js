import express from "express";
var router = express.Router();
import productController from "../../controller/pet/productController";

router.post("/createProduct", productController.createProduct);
router.post(
  "/searchProductList/:page/:size",
  productController.searchProductList
);
router.post("/updateProductDetail", productController.updateProductDetail);
router.get("/getProductDetail/:id", productController.getProductDetail);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.put("/updateProduct/:id", productController.updateProduct);
router.post("/createProduct", productController.createProduct);

export default router;
