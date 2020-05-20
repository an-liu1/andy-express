import UserInfo from "../../model/andyexpress/userInfo.model";
import OrderForm from "../../model/andyexpress/orderForm.model";
import Goods from "../../model/andyexpress/goods.model";
import Advice from "../../model/andyexpress/advices.model";
import AfterSale from "../../model/andyexpress/aftersale.model";
// import moment from "moment";
import moment from "moment-timezone";

const dataController = {};

// 获取订单数据
dataController.getOrderAnalysis = (req, res) => {
  Goods.find().then((goods) => {
    let stockPending = goods.filter((i) => i.goodStatus === "待入库").length;
    let returnPackages = goods.filter((i) => i.goodStatus === "退货中").length;
    OrderForm.find().then((orders) => {
      let packagePending = orders.filter((i) => i.orderStatus === "待打包")
        .length;
      let expressPending = orders.filter((i) => i.orderStatus === "待发货")
        .length;
      AfterSale.find().then((after) => {
        let afterSalePending = after.filter((i) => i.is_solve == false).length;
        Advice.find().then((advices) => {
          let advicePending = advices.filter((i) => !i.advice_improvement)
            .length;
          return res.json({
            success: true,
            code: 0,
            data: {
              stockPending: stockPending,
              returnPackages: returnPackages,
              packagePending: packagePending,
              expressPending: expressPending,
              afterSalePending: afterSalePending,
              advicePending: advicePending,
            },
          });
        });
      });
    });
  });
};

// 获取图标数据
dataController.getDataAnalysis = (req, res) => {
  //   let today = moment().tz("Asia/Shanghai").format("MMDD");
  let today = req.body.today;
  let activeUser0 = [];
  let activeUser1 = [];
  let activeUser2 = [];
  let activeUser3 = [];
  let activeUser4 = [];
  let activeUser5 = [];
  let activeUser6 = [];
  var activeUsers;
  let newUser0 = [];
  let newUser1 = [];
  let newUser2 = [];
  let newUser3 = [];
  let newUser4 = [];
  let newUser5 = [];
  let newUser6 = [];
  var newUsers;
  let newOrder0 = [];
  let newOrder1 = [];
  let newOrder2 = [];
  let newOrder3 = [];
  let newOrder4 = [];
  let newOrder5 = [];
  let newOrder6 = [];
  var newOrders;
  UserInfo.find().then((users) => {
    users.map((i) => {
      if (
        parseInt(moment(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today)
      ) {
        activeUser0.push(i.user_id);
      } else if (
        parseInt(moment(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 1)
      ) {
        activeUser1.push(i.user_id);
      } else if (
        parseInt(moment(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 2)
      ) {
        activeUser2.push(i.user_id);
      } else if (
        parseInt(moment(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 3)
      ) {
        activeUser3.push(i.user_id);
      } else if (
        parseInt(moment(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 4)
      ) {
        activeUser4.push(i.user_id);
      } else if (
        parseInt(moment(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 5)
      ) {
        activeUser5.push(i.user_id);
      } else if (
        parseInt(moment(i.updatedAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 6)
      ) {
        activeUser6.push(i.user_id);
      }

      if (
        parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today)
      ) {
        newUser0.push(i.user_id);
      } else if (
        parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 1)
      ) {
        newUser1.push(i.user_id);
      } else if (
        parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 2)
      ) {
        newUser2.push(i.user_id);
      } else if (
        parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 3)
      ) {
        newUser3.push(i.user_id);
      } else if (
        parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 4)
      ) {
        newUser4.push(i.user_id);
      } else if (
        parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 5)
      ) {
        newUser5.push(i.user_id);
      } else if (
        parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
        parseInt(today - 6)
      ) {
        newUser6.push(i.user_id);
      }
    });
    activeUsers = [
      activeUser0.length,
      activeUser1.length,
      activeUser2.length,
      activeUser3.length,
      activeUser4.length,
      activeUser5.length,
      activeUser6.length,
    ].reverse();
    newUsers = [
      newUser0.length,
      newUser1.length,
      newUser2.length,
      newUser3.length,
      newUser4.length,
      newUser5.length,
      newUser6.length,
    ].reverse();

    OrderForm.find().then((orders) => {
      orders.map((i) => {
        if (
          parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
          parseInt(today)
        ) {
          newOrder0.push(i.user_id);
        } else if (
          parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
          parseInt(today - 1)
        ) {
          newOrder1.push(i.user_id);
        } else if (
          parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
          parseInt(today - 2)
        ) {
          newOrder2.push(i.user_id);
        } else if (
          parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
          parseInt(today - 3)
        ) {
          newOrder3.push(i.user_id);
        } else if (
          parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
          parseInt(today - 4)
        ) {
          newOrder4.push(i.user_id);
        } else if (
          parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
          parseInt(today - 5)
        ) {
          newOrder5.push(i.user_id);
        } else if (
          parseInt(moment(i.createdAt).tz("Asia/Shanghai").format("MMDD")) ===
          parseInt(today - 6)
        ) {
          newOrder6.push(i.user_id);
        }
      });
      newOrders = [
        newOrder0.length,
        newOrder1.length,
        newOrder2.length,
        newOrder3.length,
        newOrder4.length,
        newOrder5.length,
        newOrder6.length,
      ].reverse();
      return res.json({
        success: true,
        code: 0,
        data: {
          activeUser: activeUsers,
          newUser: newUsers,
          newOrder: newOrders,
        },
      });
    });
  });
};

export default dataController;
