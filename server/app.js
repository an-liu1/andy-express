import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import pmoIndexndexRouter from "./routes/freepmo/index";
import pmoRouter from "./routes/freepmo/freepmo";
import expressIndexndexRouter from "./routes/andyexpress/index";
import expressRouter from "./routes/andyexpress/andyexpress";
import carpoolIndexndexRouter from "./routes/carpool/index";
import carpoolRouter from "./routes/carpool/carpool";
import gebisIndexRouter from "./routes/gebis/index";
import gebisBidRouter from "./routes/gebis/bid";
import gebisNewsRouter from "./routes/gebis/news";
import mongoose from "mongoose";
import passport from "passport";

var app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //允许的来源
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  ); //请求的头部
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //允许请求的方法
  res.setHeader("Access-Control-Allow-Credentials", true); // Set to true if you need the website to include cookies in the requests sent
  next();
});
// All OPTIONS requests return a simple status: 'OK'
app.options("*", (req, res) => {
  res.json({
    status: "OK",
  });
});
app.use(logger("dev"));
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(
  express.urlencoded({
    limit: "50mb",
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(passport.initialize()); // 初始化passport
// require("./config/passport")(passport); //导入配置文件
require("./config/carpoolPassport")(passport); //导入配置文件
import { gebisPassport } from "./config/gebisPassport.js"; //导入配置文件

//freepmo router
app.use("/freepmo", pmoIndexndexRouter);
app.use(
  "/freepmo",
  passport.authenticate("jwt", { session: false }),
  pmoRouter
);
//expresss router
app.use("/express", expressIndexndexRouter);
app.use(
  "/express",
  passport.authenticate("jwt", { session: false }),
  expressRouter
);
// carpool router
app.use("/carpool", carpoolIndexndexRouter);
gebisPassport(passport);
app.use(
  "/carpool",
  passport.authenticate("jwt", { session: false }),
  carpoolRouter
);
//gebis router
app.use("/gebis", gebisIndexRouter);
app.use(
  "/gebis",
  passport.authenticate("jwt", { session: false }),
  gebisBidRouter
);
app.use(
  "/gebis",
  passport.authenticate("jwt", { session: false }),
  gebisNewsRouter
);

const uri =
  "mongodb+srv://andyvviiar:8829122Aa@cluster0-dgngm.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.connection.once("open", () => {
  console.log("mongoDB connection successfully");
});

export default app;
