const nodemailer = require("nodemailer");
const { use } = require("../routes/user.router");
require("dotenv").config();

function sendMailToUsers(user) {
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER, // Replace with your email address
      pass: process.env.MAIL_PASSWORD, // Replace with your email password
    },
  });
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: user.username, // Replace with recipient email address
    subject: "New Contact Form Submission",
    text: `
        Name: ${user.name}
        Email: ${user.email}
        Message: ${"heloo welcome"}
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendMailToUsers };
