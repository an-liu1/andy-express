import mongoose from "mongoose";

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    title: { type: String, trim: true },
    author: { type: String, trim: true },
    content: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Express-Announcement", announcementSchema);

export default Announcement;
