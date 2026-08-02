import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  family: 4,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


export const sendOTPMail = async (otp, email) => {

  try {

    await transporter.sendMail({

      from: `"Ekart" <${process.env.MAIL_FROM}>`,

      to: email,

      subject: "Password Reset OTP",

      html: `
        <h2>Ekart Password Reset</h2>

        <p>Your OTP for password reset is:</p>

        <h1>${otp}</h1>

        <p>
          This OTP is valid for 10 minutes.
        </p>

        <p>
          If you did not request this password reset, please ignore this email.
        </p>

        <br>

        <p>
          Regards,<br>
          Ekart Team
        </p>
      `,
    });


    console.log("OTP Email Sent Successfully");


  } catch (error) {

    console.log("OTP MAIL ERROR:", error);

    throw error;

  }

};