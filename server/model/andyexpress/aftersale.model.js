import mongoose from "mongoose";

const Schema = mongoose.Schema;

const aftersaleSchema = new Schema(
  {
    username: { type: String, trim: true },
    user_id: { type: String, trim: true },
    email: { type: String, trim: true },
    aftersale_title: { type: String, trim: true },
    aftersale_content: { type: String, trim: true },
    aftersale_image: { type: Array },
    is_solve: { type: Boolean },
    compensation: { type: String, trim: true },
    solution: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const AfterSale = mongoose.model("Express-AfterSale", aftersaleSchema);

export default AfterSale;
