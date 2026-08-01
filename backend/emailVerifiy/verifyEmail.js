import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",        
  port: 587,                     
  secure: false,                 
  family: 4,                     
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


export const verifyEmail = async (token, email) => {
  try {

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

    await transporter.sendMail({
      from: `"Ekart" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Email Verification",

      html: `
        <h2>Welcome to Ekart</h2>

        <p>Click below to verify your email</p>

        <a href="${verifyUrl}" 
        style="
        padding:10px 20px;
        background:#ec4899;
        color:white;
        text-decoration:none;
        border-radius:5px;
        ">
          Verify Email
        </a>

        <br><br>

        <p>
        If the button doesn't work, copy and paste this link into your browser:
        </p>

        <a href="${verifyUrl}">
          ${verifyUrl}
        </a>
      `,
    });


    console.log("Verification Email Sent Successfully");

  } catch (error) {

    console.log("MAIL ERROR:", error);

    throw error;
  }
};