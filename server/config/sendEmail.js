import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // service: "gmail",
  // auth: {
  //   user: "andyvviiar@gmail.com",
  //   pass: "8829122Aa",
  // },
  // host: "hp303.hostpapa.com",
  // // host: "umaexpress.ca",
  // Server: "freepmo.andyliu.ca",
  // port: 465,
  // auth: {
  //   user: "freepmo.admin@freepmo.andyliu.ca",
  //   pass: "8829122Aa",
  // },

  host: "smtp.163.com",
  secure: true,
  port: 465,
  auth: {
    user: "yvetteandyadmin@163.com",
    pass: "ZKSKKQPIMTIAAPNX",
  },
});

export default function (mail) {
  //   const mail = {
  //     from: "andyliu@andyliu.ca",
  //     to: "friendsofenron@gmail.com, enemiesofenron@gmail.com",
  //     subject: "Invoices due",
  //     text: "Dudes, we really need your money."
  //   };

  transporter.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
