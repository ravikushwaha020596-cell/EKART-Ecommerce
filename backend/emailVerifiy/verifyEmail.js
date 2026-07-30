import nodemailer from "nodemailer";
import "dotenv/config.js";

export const verifyEmail = async (token, email) => {
   try {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
     
  });

  const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;


  
  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,

    subject: "Email Verification",

    html: `<h2>Welcome to E-Commerce</h2>
        <p>Click the button below to verify your email.</p>

        <a href="${verifyUrl}"
           style="
             display:inline-block;
             padding:12px 20px;
             background:#2563eb;
             color:#fff;
             text-decoration:none;
             border-radius:6px;
           ">
           Verify Email
        </a>

        <p>If the button doesn't work, copy and paste this link:</p>

        <p>${verifyUrl}</p>
      `,
    };

    await transporter.sendMail(mailConfigurations);

  console.log("Verification Email Sent Successfully");
  } catch (error) {
    console.error("Error Sending Verification Email:", error.message);
    throw error;
  }
};