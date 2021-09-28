import mongoose from "mongoose";

const Schema = mongoose.Schema;

const adviceSchema = new Schema(
  {
    username: { type: String, trim: true },
    user_id: { type: String, trim: true },
    avatarUrl: { type: String },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    adminReply: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const advice = mongoose.model("Carpool-advice", adviceSchema);

export default advice;
