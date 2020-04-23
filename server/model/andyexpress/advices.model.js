import mongoose from "mongoose";

const Schema = mongoose.Schema;

const advicesSchema = new Schema(
  {
    username: { type: String, trim: true },
    user_id: { type: String, trim: true },
    email: { type: String, trim: true },

    //客户提交投书
    advice_type: { type: String },
    advice_title: { type: String, trim: true },
    advice_content: { type: String, trim: true },
    evident_image: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Advices = mongoose.model("Express-Advices", advicesSchema);

export default Advices;
