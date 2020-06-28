import mongoose from "mongoose";

const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
  {
    username: { type: String },
    user_id: { type: String },
    operator: { type: String },
    exportDate: { type: String },
    senderCompanyName: { type: String },
    exportCountry: { type: String },
    senderAddress: { type: String },
    senderName: { type: String },
    senderTel: { type: String },
    receiverCompanyName: { type: String },
    receiverAddress: { type: String },
    receiverZipcode: { type: String },
    importCountry: { type: String },
    receiverName: { type: String },
    receiverTel: { type: String },
    goods: [
      {
        goodName: { type: String },
        goodNumber: { type: Number },
        goodPrice: { type: String },
        hsCode: { type: String },
        totalPrice: { type: String },
      },
    ],
    totalPrice: { type: String },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model("Express-Invoice", invoiceSchema);

export default Invoice;
