// import bidClass from "../../model/gebis/bidClass.model";
import bidItems from "../../model/gebis/bidItems.model";
import User from "../../model/gebis/user.model";
const xlsx = require("node-xlsx");

const bidItemController = {};

bidItemController.createBidItem = (req, res) => {
  req.body.creator = req.user.name;
  req.body.creator_id = req.user.id;
  bidItems
    .create(req.body)
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.getBidItemByClass = (req, res) => {
  bidItems
    .find({ class_id: req.params.id, isDeleted: false })
    .sort({ updatedAt: "desc" })
    .then((bidItem) => {
      return res.json({
        success: true,
        code: 0,
        data: bidItem,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.getAllBidItemByClass = (req, res) => {
  bidItems
    .find({ class_id: req.params.id })
    .sort({ isDeleted: "asc" })
    .sort({ updatedAt: "desc" })
    .then((bidItem) => {
      return res.json({
        success: true,
        code: 0,
        data: bidItem,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.deleteBidItem = (req, res) => {
  bidItems
    .findOneAndUpdate(
      { _id: req.body.id },
      { $set: { isDeleted: req.body.isDeleted } }
    )
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.getBidItem = (req, res) => {
  bidItems
    .find({ _id: req.params.id })
    .then((bidItem) => {
      return res.json({
        success: true,
        code: 0,
        data: bidItem[0],
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.getBidItemFinalPrice = (req, res) => {
  bidItems
    .find({ _id: req.params.id })
    .then((bidItem) => {
      return res.json({
        success: true,
        code: 0,
        data: bidItem[0].finalPrice,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.updateBidItem = (req, res) => {
  bidItems
    .findOneAndUpdate({ _id: req.body._id }, { $set: req.body })
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.getMyBidCollection = (req, res) => {
  User.find({ _id: req.user.id })
    .then((userInfo) => {
      let collected_bidItem = userInfo[0].collected_bidItem;
      bidItems
        .find({ _id: { $in: collected_bidItem } })
        .then((bidItem) => {
          return res.json({
            success: true,
            code: 0,
            data: bidItem,
          });
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.getMyBidItem = (req, res) => {
  bidItems
    .find({ endDate: { $lte: new Date() }, finalBuyerId: req.user.id })
    .then((bidItem) => {
      return res.json({
        success: true,
        code: 0,
        data: bidItem,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidItemController.getExportList = (req, res) => {
  bidItems
    .find(
      { endDate: { $lte: new Date() } },
      {
        title: 1,
        startDate: 1,
        endDate: 1,
        appraisalPrice: 1,
        finalPrice: 1,
        finalBuyer: 1,
        classTitle: 1,
        bidPriceHistory: 1,
      }
    )
    .then((exportData) => {
      let dataCVS = `Auction_List-${Math.floor(
        Math.random() * 1000000000
      )}.xlsx`;
      //1
      let alldata = [];
      let row = [
        "拍品",
        "开拍时间",
        "结束时间",
        "估价",
        "成交价",
        "成交人",
        "类别",
      ];
      alldata.push(row);

      exportData.map((i) => {
        let arr = [];
        arr.push(i.title);
        arr.push(i.startDate);
        arr.push(i.endDate);
        arr.push(i.appraisalPrice);
        arr.push(i.finalPrice);
        arr.push(i.finalBuyer);
        arr.push(i.classTitle);
        alldata.push(arr);
      });

      //2
      let history = [];
      let historyRow = ["拍品", "成交人", "成交价", "电话", "邮箱", "加价时间"];
      history.push(historyRow);

      exportData.map((i) => {
        i.bidPriceHistory.map((j) => {
          let arr1 = [];
          arr1.push(i.title);
          arr1.push(j.buyer);
          arr1.push(j.price);
          arr1.push(j.phone);
          arr1.push(j.email);
          arr1.push(j.comfirmTime);
          history.push(arr1);
        });
      });

      var buffer = xlsx.build([
        {
          name: "Auction_List",
          data: alldata,
        },
        {
          name: "Auction_Histrory",
          data: history,
        },
      ]);
      res.send(buffer);
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default bidItemController;
