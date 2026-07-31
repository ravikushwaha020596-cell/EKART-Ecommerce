import nodemailer from "nodemailer";
import "dotenv/config.js";

export const verifyEmail = async (token, email) => {
  try {

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });


    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;


    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: "Email Verification",

      html: `
      <h2>Welcome to Ekart</h2>

      <p>Click below to verify your email</p>

      <a href="${verifyUrl}">
      Verify Email
      </a>

      <p>${verifyUrl}</p>
      `,
    });


    console.log("Verification Email Sent Successfully");

  } catch(error){

    console.log("MAIL ERROR:", error.message);
    throw error;

  }
};