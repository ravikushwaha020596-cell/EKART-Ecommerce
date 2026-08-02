import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,       // Brevo SMTP
  port: Number(process.env.SMTP_PORT), // 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,     // Brevo SMTP login
    pass: process.env.SMTP_PASS,     // Brevo SMTP password
  },
});


export const sendOTPMail = async (otp, email) => {
  try {

    await transporter.sendMail({

      from: `"Ekart" <${process.env.MAIL_FROM}>`,

      to: email,

      subject: "Password Reset OTP",

      html: `
        <div>
          <h2>Ekart Password Reset</h2>

          <p>Your OTP is:</p>

          <h1>${otp}</h1>

          <p>This OTP is valid for 10 minutes.</p>

          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });


    console.log("OTP Email Sent Successfully");


  } catch (error) {

    console.log("OTP MAIL ERROR:", error);

    throw error;

  }
};