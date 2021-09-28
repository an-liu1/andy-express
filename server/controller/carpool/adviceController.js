import advice from "../../model/carpool/advice.model";

const adviceController = {};

adviceController.createNewAdvice = (req, res) => {
  req.body.username = req.user.username;
  req.body.user_id = req.user.id;
  advice
    .create(req.body)
    .then((advice) => {
      return res.json({
        success: true,
        code: 0,
        data: advice,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

adviceController.getMyAdvice = (req, res) => {
  advice
    .find({ user_id: req.user.id })
    .sort({ updatedAt: "desc" })
    .then((advice) => {
      return res.json({
        success: true,
        code: 0,
        data: advice,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

adviceController.getAllAdvice = (req, res) => {
  advice
    .find()
    .sort({ updatedAt: "desc" })
    .then((advice) => {
      return res.json({
        success: true,
        code: 0,
        data: advice,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

adviceController.adminReplyAdvice = (req, res) => {
  advice
    .findupdateOne(
      { _id: req.body.id },
      { $set: { adminReply: req.body.adminReply } }
    )
    .then((advice) => {
      return res.json({
        success: true,
        code: 0,
        data: advice,
      });
    })
    .catch((err) => res.status(400).json("Error: " + err));
};

export default adviceController;
