import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);


export const verifyEmail = async (token, email) => {
  try {

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

    await resend.emails.send({
      from: "Ekart <onboarding@resend.dev>",
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
        If button doesn't work, copy this link:
        </p>

        <a href="${verifyUrl}">
          ${verifyUrl}
        </a>
      `,
    });


    console.log("Verification Email Sent Successfully");

  } catch (error) {

    console.log("VERIFY EMAIL ERROR:", error);

    throw error;
  }
};