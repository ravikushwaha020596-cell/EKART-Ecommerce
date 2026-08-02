import * as Brevo from "@getbrevo/brevo";
import "dotenv/config";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendOTPMail = async (otp, email) => {
  try {
    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Ekart Password Reset OTP";

    sendSmtpEmail.sender = {
      name: "Ekart 🛒",
      email: process.env.MAIL_FROM,
    };

    sendSmtpEmail.to = [
      {
        email: email,
      },
    ];

    sendSmtpEmail.htmlContent = `
      <div style="font-family:Arial">

        <h2>Ekart Password Reset 🛒</h2>

        <p>Your OTP is:</p>

        <h1 style="
        color:#ec4899;
        letter-spacing:5px;
        font-size:35px;">
        ${otp}
        </h1>

        <p>This OTP is valid for <b>10 minutes</b>.</p>

        <p>If you did not request this email, ignore it.</p>

        <br>

        <p>Regards,<br>Ekart Team</p>

      </div>
    `;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ OTP SENT", result.body);
  } catch (error) {
    console.log(
      "OTP MAIL ERROR:",
      error.response?.body || error.message
    );
    throw error;
  }
};