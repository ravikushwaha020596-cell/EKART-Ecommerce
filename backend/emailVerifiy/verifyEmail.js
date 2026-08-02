import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },

  requireTLS: true,
});


// SMTP Test
transporter.verify((error) => {
  if (error) {
    console.error("SMTP Connection Failed:", error.message);
  } else {
    console.log("✅ Brevo SMTP Connected Successfully");
  }
});


export const verifyEmail = async (token, email) => {
  try {

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

    const info = await transporter.sendMail({

      from: `"Ekart 🛒" <${process.env.MAIL_FROM}>`,

      to: email,

      subject: "Verify Your Ekart Account",

      html: `
      <div style="font-family:Arial">

        <h2>Welcome to Ekart 🛒</h2>

        <p>
        Thank you for registering with Ekart.
        </p>

        <p>
        Click below to verify your email:
        </p>


        <a href="${verifyUrl}"
        style="
        background:#ec4899;
        color:white;
        padding:12px 20px;
        border-radius:6px;
        text-decoration:none;
        display:inline-block;
        ">
        Verify Email
        </a>


        <br/><br/>


        <p>
        Or copy this link:
        </p>


        <a href="${verifyUrl}">
        ${verifyUrl}
        </a>


        <br/><br/>

        <p>
        Regards,<br>
        Ekart Team
        </p>

      </div>
      `
    });


    console.log(
      "✅ Verification Email Sent:",
      info.messageId
    );


  } catch(error){

    console.error(
      "VERIFY EMAIL ERROR:",
      error.message
    );

    throw error;
  }
};