import carpoolInfoList from "../../model/carpool/carpoolInfoList.model";
import User from "../../model/carpool/user.model";

const carpoolInfoListController = {};

carpoolInfoListController.createCarpoolAds = (req, res) => {
  req.body.username = req.user.username;
  req.body.user_id = req.user.id;
  req.body.avatarUrl = req.user.avatarUrl;
  req.body.stickTop = false;
  req.body.endTrip = false;
  carpoolInfoList
    .create(req.body)
    .then((carpoolInfoList) => {
      return res.json({
        success: true,
        code: 0,
        data: carpoolInfoList,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

carpoolInfoListController.searchCarpoolInfoList = (req, res) => {
  const pageOptions = {
    page: parseInt(req.params.page) || 0,
    size: parseInt(req.params.size) || 10,
  };
  let carpoolTime = req.body.carpoolTime
    ? new Date(req.body.carpoolTime)
    : null;
  let carpoolDate = req.body.carpoolTime
    ? new Date(
        new Date(req.body.carpoolTime).setDate(
          new Date(req.body.carpoolTime).getDate() + 1
        )
      )
    : null;
  req.body.minPrice = req.body.minPrice ? parseInt(req.body.minPrice) : null;
  req.body.maxPrice = req.body.maxPrice ? parseInt(req.body.maxPrice) : null;
  carpoolInfoList
    .find(
      req.body.keyword
        ? {
            $or: [
              { _id: req.body.keyword },
              { user_id: eval(`/${req.body.keyword}/i`) },
              { username: eval(`/${req.body.keyword}/i`) },
              { fromCity: eval(`/${req.body.keyword}/i`) },
              { toCity: eval(`/${req.body.keyword}/i`) },
              // { price: eval(`/${req.body.keyword}/i`) },
              // { wholePrice: eval(`/${req.body.keyword}/i`) },
              { description: eval(`/${req.body.keyword}/i`) },
              { contact: eval(`/${req.body.keyword}/i`) },
              { phoneNumber: eval(`/${req.body.keyword}/i`) },
              { weixin: eval(`/${req.body.keyword}/i`) },
            ],
          }
        : {
            $and: [
              req.body.fromCity
                ? { fromCity: eval(`/${req.body.fromCity}/i`) }
                : {},
              req.body.toCity ? { toCity: eval(`/${req.body.toCity}/i`) } : {},
              {
                $and: [
                  carpoolTime
                    ? {
                        $and: [
                          {
                            carpoolTime: {
                              $lt: carpoolDate,
                            },
                          },
                          {
                            carpoolTime: {
                              $gt: carpoolTime,
                            },
                          },
                        ],
                      }
                    : {},
                  {
                    carpoolTime: {
                      $gt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000),
                    },
                  },
                ],
              },
              req.body.minPrice ? { price: { $gt: req.body.minPrice } } : {},
              req.body.maxPrice ? { price: { $lt: req.body.maxPrice } } : {},
              req.body.seatNumb ? { seatNumb: { $gt: req.body.seatNumb } } : {},
              { $or: [{ endTrip: false }, { endTrip: null }] },
            ],
          }
    )
    .sort({ stickTop: -1, updatedAt: "desc" })
    .skip(pageOptions.page * pageOptions.size)
    .limit(pageOptions.size)
    .then((carpoolInfoList) => {
      return res.json({
        success: true,
        code: 0,
        data: carpoolInfoList,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

carpoolInfoListController.saveCarpoolInfo = (req, res) => {
  User.find({ _id: req.user.id })
    .then((userInfo) => {
      userInfo = userInfo[0];
      if (userInfo.saved_carpool.length > 0) {
        if (
          userInfo.saved_carpool.filter((i) => i == req.body.carpool_id)
            .length > 0
        ) {
          userInfo.saved_carpool = userInfo.saved_carpool.remove(
            req.body.carpool_id
          );
        } else {
          userInfo.saved_carpool = userInfo.saved_carpool.concat(
            req.body.carpool_id
          );
        }
      } else {
        userInfo.saved_carpool = [req.body.carpool_id];
      }

      User.updateOne(
        { _id: req.user.id },
        { $set: { saved_carpool: userInfo.saved_carpool } }
      )
        .then(() => {
          User.find({ _id: req.user.id })
            .then((userInfo) => {
              return res.json({
                success: true,
                code: 0,
                data: userInfo[0],
              });
            })
            .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

carpoolInfoListController.getSavedCarpoolList = (req, res) => {
  carpoolInfoList
    .find({ _id: { $in: req.user.saved_carpool } })
    .sort({ updatedAt: "desc" })
    .then((carpoolInfo) => {
      return res.json({
        success: true,
        code: 0,
        data: carpoolInfo,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

carpoolInfoListController.getMyCarpoolList = (req, res) => {
  carpoolInfoList
    .find({ user_id: req.user.id })
    .sort({ stickTop: -1, updatedAt: "desc" })
    .then((carpoolInfo) => {
      return res.json({
        success: true,
        code: 0,
        data: carpoolInfo,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

carpoolInfoListController.editMyCarpoolList = (req, res) => {
  carpoolInfoList
    .updateOne({ _id: req.body._id }, { $set: req.body })
    .then((carpoolInfo) => {
      return res.json({
        success: true,
        code: 0,
        data: carpoolInfo,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

carpoolInfoListController.stickMyCarpoolList = (req, res) => {
  carpoolInfoList
    .updateOne({ _id: req.body._id }, { stickTop: req.body.stickTop })
    .then((carpoolInfo) => {
      return res.json({
        success: true,
        code: 0,
        data: carpoolInfo,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

carpoolInfoListController.endCarpoolTrip = (req, res) => {
  carpoolInfoList
    .updateOne({ _id: req.body._id }, { endTrip: req.body.endTrip })
    .then((carpoolInfo) => {
      return res.json({
        success: true,
        code: 0,
        data: carpoolInfo,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default carpoolInfoListController;
