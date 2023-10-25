import mongoose from "mongoose";

const Schema = mongoose.Schema;

const homeSchema = new Schema(
  {
    noticeBarText: { type: String, trim: true },
    banner: { type: String, trim: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Home = mongoose.model("Gebis-Home", homeSchema);

export default Home;
