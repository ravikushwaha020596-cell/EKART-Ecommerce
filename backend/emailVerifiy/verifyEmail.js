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
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY ERROR:", error);
  } else {
    console.log("SMTP READY");
  }
});

export const verifyEmail = async (token, email) => {
  try {
    console.log("========== EMAIL DEBUG ==========");
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);
    console.log("CLIENT_URL:", process.env.CLIENT_URL);
    console.log("Sending To:", email);
    console.log("================================");

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
          display:inline-block;
          padding:10px 20px;
          background:#ec4899;
          color:#ffffff;
          text-decoration:none;
          border-radius:5px;
        ">
          Verify Email
        </a>

        <br><br>

        <p>If the button doesn't work, copy and paste this link into your browser:</p>

        <a href="${verifyUrl}">
          ${verifyUrl}
        </a>
      `,
    });

    console.log("Verification Email Sent Successfully");
  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
};