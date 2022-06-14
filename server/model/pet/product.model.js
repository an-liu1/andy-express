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
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Pet-product", productSchema);

export default Product;
