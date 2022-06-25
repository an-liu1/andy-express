"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _product = _interopRequireDefault(require("../../model/pet/product.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var productController = {};

productController.createProduct = function (req, res) {
  _product["default"].create(req.body).then(function (product) {
    return res.json({
      success: true,
      code: 0,
      data: product
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

productController.searchProductList = function (req, res) {
  var pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 12
  };
  var criteria = req.body.keyword ? {
    $or: [// { _id: req.body.keyword },
    {
      productImg: eval("/".concat(req.body.keyword, "/i"))
    }, {
      name: eval("/".concat(req.body.keyword, "/i"))
    }, {
      displayName: eval("/".concat(req.body.keyword, "/i"))
    }, {
      size: eval("/".concat(req.body.keyword, "/i"))
    }, {
      category: eval("/".concat(req.body.keyword, "/i"))
    }, {
      pet: eval("/".concat(req.body.keyword, "/i"))
    }, {
      flavour: eval("/".concat(req.body.keyword, "/i"))
    }, {
      "package": eval("/".concat(req.body.keyword, "/i"))
    }, // { price: eval(`/${req.body.keyword}/i`) },
    {
      brand: eval("/".concat(req.body.keyword, "/i"))
    }]
  } : {
    $and: [req.body.category ? {
      category: eval("/".concat(req.body.category, "/i"))
    } : {}, req.body.size ? {
      size: eval("/".concat(req.body.size, "/i"))
    } : {}, req.body.pet ? {
      pet: eval("/".concat(req.body.pet, "/i"))
    } : {}]
  };

  _product["default"].find(criteria).sort({
    updatedAt: "desc"
  }).skip(pageOptions.page * pageOptions.size).limit(pageOptions.size).then(function (product) {
    _product["default"].find(criteria).countDocuments().then(function (total) {
      var data = {};
      data.total = total;
      data.product = product;
      return res.json({
        success: true,
        code: 0,
        data: data
      });
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

productController.updateProductDetail = function (req, res) {
  _product["default"].updateOne({
    _id: req.body._id
  }, {
    $set: req.body
  }).then(function (product) {
    return res.json({
      success: true,
      code: 0,
      data: product
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

productController.getProductDetail = function (req, res) {
  _product["default"].find({
    _id: req.params.id
  }).then(function (product) {
    return res.json({
      success: true,
      code: 0,
      data: product[0]
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

productController.deleteProduct = function (req, res) {
  _product["default"].findByIdAndDelete(req.params.id).then(function (product) {
    return res.json({
      success: true,
      code: 0,
      data: product
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

productController.updateProduct = function (req, res) {
  _product["default"].updateOne({
    _id: req.params.id
  }, {
    $set: req.body
  }).then(function (product) {
    return res.json({
      success: true,
      code: 0,
      data: product
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

productController.createProduct = function (req, res) {
  _product["default"].create(req.body).then(function (product) {
    return res.json({
      success: true,
      code: 0,
      data: product
    });
  })["catch"](function (err) {
    return res.status(400).json("Error: " + err);
  });
};

var _default = productController;
exports["default"] = _default;