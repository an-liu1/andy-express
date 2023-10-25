import bidClass from "../../model/gebis/bidClass.model";
import bidItems from "../../model/gebis/bidItems.model";

const bidClassController = {};

bidClassController.getBidClassList = (req, res) => {
  bidClass
    .find({ isDeleted: false })
    .sort({ updatedAt: "desc" })
    .then((bidClass) => {
      return res.json({
        success: true,
        code: 0,
        data: bidClass,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidClassController.createBidClass = (req, res) => {
  req.body.creator = req.user.name;
  req.body.creator_id = req.user.id;
  bidClass
    .create(req.body)
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidClassController.getAllBidClass = (req, res) => {
  bidClass
    .find()
    .sort({ isDeleted: "asc" })
    .sort({ updatedAt: "desc" })
    .then((bidClass) => {
      return res.json({
        success: true,
        code: 0,
        data: bidClass,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidClassController.deleteBidClass = (req, res) => {
  bidClass
    .findOneAndUpdate(
      { _id: req.body.id },
      { $set: { isDeleted: req.body.isDeleted } }
    )
    .then(() => {
      bidItems
        .updateMany(
          { class_id: { $in: [req.body.id] } },
          { $set: { isDeleted: req.body.isDeleted } }
        )
        .then(() => {
          return res.json({
            success: true,
            code: 0,
          });
        });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidClassController.getBidClass = (req, res) => {
  bidClass
    .find({ _id: req.params.id })
    .then((bidClass) => {
      return res.json({
        success: true,
        code: 0,
        data: bidClass[0],
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

bidClassController.updateBidClass = (req, res) => {
  bidClass
    .findOneAndUpdate({ _id: req.body._id }, { $set: req.body })
    .then(() => {
      return res.json({
        success: true,
        code: 0,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default bidClassController;
