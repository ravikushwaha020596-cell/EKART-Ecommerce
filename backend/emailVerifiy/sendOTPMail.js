import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
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

// SMTP Connection Test
transporter.verify((error) => {
  if (error) {
    console.error("SMTP Verify Error:", error);
  } else {
    console.log("✅ SMTP Server is ready to send emails");
  }
});


export const sendOTPMail = async (otp, email) => {
  try {
    await transporter.sendMail({
      from: `"Ekart" <${process.env.MAIL_FROM}>`,
      to: email,
      subject: "Password Reset OTP",

      html: `
        <h2>Ekart Password Reset 🛒</h2>

        <p>Your OTP for password reset is:</p>

        <h1
          style="
            color:#ec4899;
            letter-spacing:4px;
            font-size:32px;
          "
        >
          ${otp}
        </h1>

        <p>
          This OTP is valid for 
          <strong>10 minutes</strong>.
        </p>

        <p>
          If you did not request this password reset,
          please ignore this email.
        </p>

        <br>

        <p>
          Regards,<br>
          Ekart Team
        </p>
      `,
    });

    console.log("✅ OTP Email Sent Successfully");

  } catch (error) {
    console.error("OTP MAIL ERROR:", error);
    throw error;
  }
};