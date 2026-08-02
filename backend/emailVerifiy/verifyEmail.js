import * as Brevo from "@getbrevo/brevo";
import "dotenv/config";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const verifyEmail = async (token, email) => {
  try {
    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

    const sendSmtpEmail = new Brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Verify Your Ekart Account";

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
        <h2>Welcome to Ekart 🛒</h2>

        <p>Thank you for registering.</p>

        <p>Click below to verify your email.</p>

        <a href="${verifyUrl}"
        style="
        background:#ec4899;
        color:white;
        padding:12px 20px;
        text-decoration:none;
        border-radius:6px;
        display:inline-block;">
        Verify Email
        </a>

        <br><br>

        <p>Or copy this link:</p>

        <a href="${verifyUrl}">
        ${verifyUrl}
        </a>

        <br><br>

        <p>Regards,<br>Ekart Team</p>
      </div>
    `;

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ VERIFY EMAIL SENT", result.body);
  } catch (error) {
    console.log(
      "VERIFY EMAIL ERROR:",
      error.response?.body || error.message
    );
    throw error;
  }
};