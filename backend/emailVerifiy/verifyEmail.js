import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

transporter.verify((error) => {
  if (error) {
    console.error("SMTP Verify Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});

export const verifyEmail = async (token, email) => {
  try {
    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

    await transporter.sendMail({
      from: `"Ekart" <${process.env.MAIL_FROM}>`,
      to: email,
      subject: "Email Verification",

      html: `
        <h2>Welcome to Ekart 🛒</h2>
        <p>Thank you for registering with Ekart.</p>

        <p>Click below to verify your email:</p>

        <a href="${verifyUrl}"
        style="
        display:inline-block;
        padding:12px 22px;
        background:#ec4899;
        color:white;
        text-decoration:none;
        border-radius:6px;
        font-weight:bold;">
        Verify Email
        </a>

        <br><br>

        <p>If button doesn't work:</p>
        <a href="${verifyUrl}">
        ${verifyUrl}
        </a>

        <br><br>

        <p>Regards,<br>Ekart Team</p>
      `,
    });

    console.log("✅ Verification Email Sent Successfully");

  } catch (error) {
    console.error("MAIL ERROR:", error);
    throw error;
  }
};