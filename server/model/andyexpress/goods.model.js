import mongoose from "mongoose";

const Schema = mongoose.Schema;

const goodsSchema = new Schema(
  {
    goodStatus: { type: String }, //待入库 已入库 待打包 已打包 退货中 已退货

    // 客户上传单号创建物品信息（物品状态：待入库）
    user_id: { type: String },
    username: { type: String },
    goodName: { type: String },
    localExpressNumber: { type: String },
    localExpressCompany: { type: String },

    //客服收货返回信息（物品状态：已入库）
    goodImg: { type: String },
    goodSize_width: { type: String },
    goodSize_height: { type: String },
    goodSize_length: { type: String },
    goodWeight: { type: Number },
    goodType: { type: Number },
    packageLocation: { type: String },
    isStorage: { type: Boolean },
    storageTime: { type: Date },
    note: { type: String },

    //判断物品是否打包 （已打包）
    isPackage: { type: Boolean },
    packageTime: { type: Date },

    //用户填写退货地址（退货中）
    returnShippingCountry: { type: String },
    returnShippingProvince: { type: String },
    returnShippingCity: { type: String },
    returnShippingAddress: { type: String },
    returnShippingPostcode: { type: String },
  },
  {
    timestamps: true,
  }
);

const Goods = mongoose.model("Express-Goods", goodsSchema);

export default Goods;
