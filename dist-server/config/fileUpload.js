"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpToken = getUpToken;
exports.uploadFile = uploadFile;

var qiniu_sdk = require("qiniu");

function getUpToken(key) {
  qiniu_sdk.conf.ACCESS_KEY = "nup_XRKRNYOucl41pxktJ7PuJpEergylT13xNKRo";
  qiniu_sdk.conf.SECRET_KEY = "yF6YIjYDG5VaIH15V-qxpjQeomBMHTVDKplwIL-w"; // 要上传的空间

  var bucket = "andy-express";
  var policy = new qiniu_sdk.rs.PutPolicy({
    isPrefixalScope: 1,
    scope: bucket + ":" + key
  });
  return policy.uploadToken();
}

function uploadFile(file_name, file_path) {
  qiniu_sdk.conf.ACCESS_KEY = "nup_XRKRNYOucl41pxktJ7PuJpEergylT13xNKRo";
  qiniu_sdk.conf.SECRET_KEY = "yF6YIjYDG5VaIH15V-qxpjQeomBMHTVDKplwIL-w"; // 要上传的空间

  var bucket = "andy-express"; // 生成上传文件的 token

  var token = function token(bucket, key) {
    var policy = new qiniu_sdk.rs.PutPolicy({
      isPrefixalScope: 1,
      scope: bucket + ":" + key
    });
    return policy.uploadToken();
  };

  var config = new qiniu_sdk.conf.Config(); // 保存到七牛的地址

  var file_save_path = file_name; // 七牛上传的token

  var up_token = token(bucket, file_save_path);
  var extra = new qiniu_sdk.form_up.PutExtra();
  var formUploader = new qiniu_sdk.form_up.FormUploader(config); // 上传文件

  formUploader.putFile(up_token, file_save_path, file_path, extra, function (err, ret) {
    if (!err) {
      // 上传成功， 处理返回值
      console.log(ret);
    } else {
      // 上传失败， 处理返回代码
      console.error(err);
    }
  });
}