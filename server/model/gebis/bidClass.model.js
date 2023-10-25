import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bidClassSchema = new Schema(
  {
    creator: { type: String, trim: true },
    creator_id: { type: String, trim: true },
    classTitle: { type: String, trim: true },
    classCoverImg: { type: String, trim: true },
    classShortDes: { type: String, trim: true },
    classLongDes: { type: String, trim: true },
    startDate: { type: Date, trim: true },
    endDate: { type: Date, trim: true },
    bidItemList: { type: [String] },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const BidClass = mongoose.model("Gebis-BidClass", bidClassSchema);

export default BidClass;
