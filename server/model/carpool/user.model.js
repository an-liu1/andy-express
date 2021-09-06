import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
    },
    gender: { type: Number },
    openid: {
      type: String,
      required: true,
      trim: true,
    },
    sessionKey: {
      type: String,
      required: true,
      trim: true,
    },
    last_login_time: {
      type: Date,
    },
    saved_carpool: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Carpool-User", userSchema);

export default User;
