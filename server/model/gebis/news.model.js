import mongoose from "mongoose";

const Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: { type: String, trim: true },
    subTitle: { type: String, trim: true },
    author: { type: String, trim: true },
    banner: { type: String, trim: true },
    content: { type: [String] },
    creator: { type: String, trim: true },
    creator_id: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("Gebis-News", newsSchema);

export default News;
