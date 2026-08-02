import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  family: 4,

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


export const sendOTPMail = async (otp, email) => {
  try {

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


  } catch(error){

    console.log("OTP MAIL ERROR:", error);

    throw error;
  }
};