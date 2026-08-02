import nodemailer from "nodemailer";
import dns from "dns";
import "dotenv/config";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// SMTP connection test
transporter.verify((error) => {
  if (error) {
    console.error("SMTP VERIFY ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

export const sendOTPMail = async (otp, email) => {
  try {
    console.log("========== OTP EMAIL DEBUG ==========");
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);
    console.log("Sending OTP To:", email);
    console.log("=====================================");

    await transporter.sendMail({
      from: `"Ekart" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `
        <h2>Password Reset</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    console.log("OTP Email Sent Successfully");
  } catch (error) {
    console.error("OTP MAIL ERROR:", error);
    throw error;
  }
};