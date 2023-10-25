import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    code: { type: String, trim: true },
    openid: { type: String, trim: true },
    sessionKey: { type: String, trim: true },
    last_login_time: { type: Date },
    isUserExist: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    collected_bidItem: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Gebis-User", userSchema);

export default User;
