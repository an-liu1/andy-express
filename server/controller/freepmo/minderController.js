import Minder from "../../model/freepmo/minder.model";

const minderController = {};

minderController.getAllMinder = (req, res) => {
  Minder.find({
    userId: req.user.id
  })
    .then(minder =>
      res.json({
        data: minder,
        success: true,
        code: 0
      })
    )
    .catch(err => res.status(400).json("Error: " + err));
};

minderController.getExampleMinder = (req, res) => {
  Minder.find({
    type: "default"
  })
    .then(minder =>
      res.json({
        data: minder,
        success: true,
        code: 0
      })
    )
    .catch(err => res.status(400).json("Error: " + err));
};

minderController.setMinder = (req, res) => {
  Minder.findOne({
    projectName: req.body.projectName,
    userId: req.user.id
  }).then(minder => {
    if (minder) {
      return res.status(400).json("项目或分类脑图已存在,请更换项目名称！");
    } else {
      req.body.userId = req.user.id;
      Minder.create(req.body)
        .then(minder =>
          res.json({
            data: minder,
            success: true,
            code: 0
          })
        )
        .catch(err => res.status(400).json("Error: " + err));
    }
  });
};

minderController.getMinder = (req, res) => {
  Minder.find({
    _id: req.params.minderId
  })
    .then(minder =>
      res.json({
        data: minder,
        success: true,
        code: 0
      })
    )
    .catch(err => res.status(400).json("Error: " + err));
};

minderController.updateMinder = (req, res) => {
  Minder.findOneAndUpdate(
    { _id: req.params.minderId },
    { $set: req.body },
    { new: true }
  )
    .then(minder =>
      res.json({
        data: minder,
        success: true,
        code: 0
      })
    )
    .catch(err => res.status(400).json("Error: " + err));
};

minderController.deleteMinder = (req, res) => {
  Minder.findOneAndRemove({ _id: req.params.minderId })
    .then(minder =>
      res.json({
        data: minder,
        success: true,
        code: 0
      })
    )
    .catch(err => res.status(400).json("Error: " + err));
};

export default minderController;
