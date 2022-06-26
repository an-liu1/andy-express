import Product from "../../model/pet/product.model";

const productController = {};

productController.createProduct = (req, res) => {
  Product.create(req.body)
    .then((product) => {
      return res.json({
        success: true,
        code: 0,
        data: product,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

productController.searchProductList = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 12,
  };
  const criteria = req.body.keyword
    ? {
        $or: [
          // { _id: req.body.keyword },
          { productImg: eval(`/${req.body.keyword}/i`) },
          { name: eval(`/${req.body.keyword}/i`) },
          { displayName: eval(`/${req.body.keyword}/i`) },
          { size: eval(`/${req.body.keyword}/i`) },
          { category: eval(`/${req.body.keyword}/i`) },
          { pet: eval(`/${req.body.keyword}/i`) },
          { flavour: eval(`/${req.body.keyword}/i`) },
          { package: eval(`/${req.body.keyword}/i`) },
          // { price: eval(`/${req.body.keyword}/i`) },
          { brand: eval(`/${req.body.keyword}/i`) },
          { description: eval(`/${req.body.keyword}/i`) },
        ],
      }
    : {
        $and: [
          req.body.category
            ? { category: eval(`/${req.body.category}/i`) }
            : {},
          req.body.size ? { size: eval(`/${req.body.size}/i`) } : {},
          req.body.pet ? { pet: eval(`/${req.body.pet}/i`) } : {},
        ],
      };
  Product.find(criteria)
    .sort({ updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((product) => {
      Product.find(criteria)
        .countDocuments()
        .then((total) => {
          let data = {};
          data.total = total;
          data.product = product;
          return res.json({
            success: true,
            code: 0,
            data: data,
          });
        });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

productController.updateProductDetail = (req, res) => {
  Product.updateOne({ _id: req.body._id }, { $set: req.body })
    .then((product) => {
      return res.json({
        success: true,
        code: 0,
        data: product,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

productController.getProductDetail = (req, res) => {
  Product.find({ _id: req.params.id })
    .then((product) => {
      return res.json({
        success: true,
        code: 0,
        data: product[0],
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

productController.deleteProduct = (req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then((product) =>
      res.json({
        success: true,
        code: 0,
        data: product,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

productController.updateProduct = (req, res) => {
  Product.updateOne({ _id: req.params.id }, { $set: req.body })
    .then((product) =>
      res.json({
        success: true,
        code: 0,
        data: product,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
};

productController.createProduct = (req, res) => {
  Product.create(req.body)
    .then((product) => {
      return res.json({
        success: true,
        code: 0,
        data: product,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default productController;
