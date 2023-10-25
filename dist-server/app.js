"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _morgan = _interopRequireDefault(require("morgan"));

var _index = _interopRequireDefault(require("./routes/freepmo/index"));

var _freepmo = _interopRequireDefault(require("./routes/freepmo/freepmo"));

var _index2 = _interopRequireDefault(require("./routes/andyexpress/index"));

var _andyexpress = _interopRequireDefault(require("./routes/andyexpress/andyexpress"));

var _index3 = _interopRequireDefault(require("./routes/carpool/index"));

var _carpool = _interopRequireDefault(require("./routes/carpool/carpool"));

var _index4 = _interopRequireDefault(require("./routes/gebis/index"));

var _bid = _interopRequireDefault(require("./routes/gebis/bid"));

var _news = _interopRequireDefault(require("./routes/gebis/news"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _gebisPassport = require("./config/gebisPassport.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); //允许的来源

  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Authorization"); //请求的头部

  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //允许请求的方法

  res.setHeader("Access-Control-Allow-Credentials", true); // Set to true if you need the website to include cookies in the requests sent

  next();
}); // All OPTIONS requests return a simple status: 'OK'

app.options("*", function (req, res) {
  res.json({
    status: "OK"
  });
});
app.use((0, _morgan["default"])("dev"));
app.use(_express["default"].json({
  limit: "50mb"
}));
app.use(_express["default"].urlencoded({
  limit: "50mb",
  extended: false
}));
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](_path["default"].join(__dirname, "../public")));
app.use(_passport["default"].initialize()); // 初始化passport
// require("./config/passport")(passport); //导入配置文件

require("./config/carpoolPassport")(_passport["default"]); //导入配置文件


//导入配置文件
//freepmo router
app.use("/freepmo", _index["default"]);
app.use("/freepmo", _passport["default"].authenticate("jwt", {
  session: false
}), _freepmo["default"]); //expresss router

app.use("/express", _index2["default"]);
app.use("/express", _passport["default"].authenticate("jwt", {
  session: false
}), _andyexpress["default"]); // carpool router

app.use("/carpool", _index3["default"]);
(0, _gebisPassport.gebisPassport)(_passport["default"]);
app.use("/carpool", _passport["default"].authenticate("jwt", {
  session: false
}), _carpool["default"]); //gebis router

app.use("/gebis", _index4["default"]);
app.use("/gebis", _passport["default"].authenticate("jwt", {
  session: false
}), _bid["default"]);
app.use("/gebis", _passport["default"].authenticate("jwt", {
  session: false
}), _news["default"]);
var uri = "mongodb+srv://andyvviiar:8829122Aa@cluster0-dgngm.mongodb.net/test?retryWrites=true&w=majority";

_mongoose["default"].connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

_mongoose["default"].set("useCreateIndex", true);

_mongoose["default"].set("useFindAndModify", false);

_mongoose["default"].connection.once("open", function () {
  console.log("mongoDB connection successfully");
});

var _default = app;
exports["default"] = _default;