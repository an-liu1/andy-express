import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pmoUserInfoSchema = new Schema(
  {
    username: { type: String, required: true },
    user_id: { type: String },
    avatar: {
      type: String,
      default:
        "images/default_avatar.png",
    },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

const pmoUserInfo = mongoose.model("pmoUserInfo", pmoUserInfoSchema);

export default pmoUserInfo;
