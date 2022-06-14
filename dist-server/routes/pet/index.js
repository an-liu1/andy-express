"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _productController = _interopRequireDefault(require("../../controller/pet/productController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post("/createProduct", _productController["default"].createProduct);
router.post("/searchProductList/:page/:size", _productController["default"].searchProductList);
router.post("/updateProductDetail", _productController["default"].updateProductDetail);
router.get("/getProductDetail/:id", _productController["default"].getProductDetail);
router["delete"]("/deleteProduct/:id", _productController["default"].deleteProduct);
router.put("/updateProduct/:id", _productController["default"].updateProduct);
router.post("/createProduct", _productController["default"].createProduct);
var _default = router;
exports["default"] = _default;