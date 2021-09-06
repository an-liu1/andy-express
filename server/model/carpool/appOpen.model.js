import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appOpenSchema = new Schema(
  {
    beOpenedTimes: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const appOpen = mongoose.model("Carpool-appOpen", appOpenSchema);

export default appOpen;
