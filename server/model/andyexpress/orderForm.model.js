import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderFormSchema = new Schema(
  {
    orderStatus: { type: String }, //待打包 已打包 待发货 已发货 已签收

    //创建订单（订单状态：待打包）
    user_id: { type: String },
    username: { type: String },
    orderGoodsList: [
      {
        goodId: String,
        goodName: String,
        goodLocation: String,
      },
    ],
    shippingCountry: { type: String },

    // 客服返回已打包订单详情（订单状态：已打包）
    orderImg: { type: String },
    orderSize_width: { type: String },
    orderSize_height: { type: String },
    orderSize_length: { type: String },
    orderWeight: { type: Number },
    orderType: { type: Number },
    packageLocation: { type: String },
    retailPriceAndTime: {
      DHL: { price: Number, time: Number },
      UPS: { price: Number, time: Number },
      FedEx: { price: Number, time: Number },
      TNT: { price: Number, time: Number },
      EMS: { price: Number, time: Number },
      Special: { price: Number, time: Number },
    },
    packageTime: { type: Date },

    // 客户填写订单邮寄地址 （订单状态：待发货）
    orderExpressRetail: { type: String },
    incomePrice: { type: Number },
    shippingProvince: { type: String },
    shippingCity: { type: String },
    shippingAddress: { type: String },
    shippingPostcode: { type: String },
    shippingPhone: { type: String },
    shippingRecevier: { type: String },

    //客服返回订单号及成本初步统计（订单状态：已发货）
    orderShippingNumber: { type: String },
    costPrice: { type: Number },

    // 客户确定收货及评分（订单状态：已签收）
    is_delivery: { type: Boolean, default: 0 },
    orderEvaluate: { type: String },

    //是否提交售后
    is_aftersale: { type: Boolean, default: 0 },

    //赔付
    compensation: { type: String },
  },
  {
    timestamps: true,
  }
);

const orderForm = mongoose.model("Express-orderForm", orderFormSchema);

export default orderForm;
