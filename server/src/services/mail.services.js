import nodemailer from "nodemailer";
import { EMAIL_ID, EMAIL_PWD, SOCKET_ORIGIN } from "../constants.js";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ID,
    pass: EMAIL_PWD,
  },
});

export const sendMail = async (
  email,
  name,
  link = SOCKET_ORIGIN,
  subject,
  template
) => {
  var mailOptions = {
    from: EMAIL_ID,
    to: email,
    subject: subject,
    text: "Notification from Social Karma",
    html: template(name, link),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    } else {
      return new Promise((resolve, reject) => {
        resolve(info);
      });
    }
  });
};
