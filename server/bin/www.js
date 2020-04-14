#!/usr/bin/env node

/**
 * Module dependencies.
 */
import app from "../app";
import debugLib from "debug";
import http from "http";
// import https from "https";
// import fs from "fs";
// import net from "net";

const debug = debugLib("andy-express:server");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "3300");
app.set("port", port);

/**
 * Create HTTP server.
 */

// var httpsPort = "3300";
// https
//   .createServer(
//     {
//       key: fs.readFileSync("server.key", "utf8"),
//       cert: fs.readFileSync("server.cert", "utf8"),
//     },
//     app
//   )
//   .listen(httpsPort);

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

// net
//   .createServer(function (socket) {
//     socket.once("data", function (buf) {
//       // https数据流的第一位是十六进制“16”，转换成十进制就是22
//       var address = buf[0] === 22 ? httpsPort : port;
//       //创建一个指向https或http服务器的链接
//       var proxy = net.createConnection(address, function () {
//         proxy.write(buf);
//         //反向代理的过程，tcp接受的数据交给代理链接，代理链接服务器端返回数据交由socket返回给客户端
//         socket.pipe(proxy).pipe(socket);
//       });
//       proxy.on("error", function (err) {
//         console.log(err);
//       });
//     });
//     socket.on("error", function (err) {
//       console.log(err);
//     });
//   }, app)
//   .listen(3500);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
