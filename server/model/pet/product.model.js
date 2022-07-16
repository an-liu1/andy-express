import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productImg: { type: String, trim: true },
    name: { type: String, trim: true },
    displayName: { type: String, trim: true },
    brand: { type: String, trim: true },
    size: { type: String, trim: true },
    category: { type: String, trim: true },
    pet: { type: String, trim: true },
    flavour: { type: String, trim: true },
    package: { type: String, trim: true },
    price: { type: Number, trim: true },
    originPrice: { type: Number, trim: true },
    description: { type: String, trim: true },
    productSizeAndPrice: [
      {
        size: { type: String, trim: true, default: 0 },
        price: { type: Number, trim: true, default: 0 },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Pet-product", productSchema);

export default Product;
