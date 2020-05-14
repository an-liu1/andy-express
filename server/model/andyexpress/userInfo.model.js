import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    username: { type: String, required: true },
    user_id: { type: String },
    avatar: {
      type: String,
      default: "images/andyexpress/avatar/default_avatar.png",
    },
    email: { type: String },
    last_login_time: {
      type: Date,
    },
    level: { type: String },
    address: [
      {
        ShippingCountry: { type: String },
        ShippingProvince: { type: String },
        ShippingCity: { type: String },
        ShippingAddress: { type: String },
        ShippingPostcode: { type: String },
        shippingPhone: { type: String },
        shippingRecevier: { type: String },
      },
    ],
    birthday: { type: Date },
    phoneNumber: { type: String },
    gender: { type: String },
    weixin: { type: String },
    qq: { type: String },

    //余额
    balance: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const UserInfo = mongoose.model("Express-UserInfo", userInfoSchema);

export default UserInfo;
