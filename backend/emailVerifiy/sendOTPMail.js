import nodemailer from "nodemailer";
import "dotenv/config.js";

export const sendOTPMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, // <--- ye line add karo
      },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Password Reset OTP",
    html: `<p>Your OTP for password reset is: <br/> ${otp}</p>`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      console.log("Error sending email:", error);
      return;
    }
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
