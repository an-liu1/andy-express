import mongoose from "mongoose";

const Schema = mongoose.Schema;

const aftersaleSchema = new Schema(
  {
    username: { type: String, trim: true },
    user_id: { type: String, trim: true },
    email: { type: String, trim: true },

    //客户提交售后
    order_id: { type: String },
    aftersale_title: { type: String, trim: true },
    aftersale_content: { type: String, trim: true },
    aftersale_image: { type: Array },

    // 客服给出解决方案及金额赔偿
    compensation: { type: String, trim: true },
    solution: { type: String, trim: true },

    // 客户关闭售后
    is_solve: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const AfterSale = mongoose.model("Express-AfterSale", aftersaleSchema);

export default AfterSale;
