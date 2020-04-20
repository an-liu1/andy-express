import mongoose from "mongoose";

const Schema = mongoose.Schema;

const announcementSchema = new Schema(
  {
    title: { type: String },
    type: { type: String },
    content: { type: String },
    importance: { type: Number },
    summary: { type: String },
  },
  {
    timestamps: true,
  }
);

const Announcement = mongoose.model("Express-Announcement", announcementSchema);

export default Announcement;
