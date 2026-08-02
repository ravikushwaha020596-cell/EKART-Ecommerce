import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const verifyEmail = async (token, email) => {
  try {

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

    console.log("FINAL VERIFY URL:", verifyUrl);
    console.log("SEND TO:", email);

    const result = await resend.emails.send({
      from: "Ekart <onboarding@resend.dev>",
      to: email,
      subject: "Email Verification",

      html: `
        <h2>Welcome to Ekart</h2>

        <p>Click below to verify your email</p>

        <a href="${verifyUrl}">
          Verify Email
        </a>

        <br/><br/>

        <p>${verifyUrl}</p>
      `,
    });

    console.log("RESEND RESULT:", result);

    console.log("Verification Email Sent Successfully");

  } catch(error) {

    console.log("MAIL ERROR:", error);

    throw error;
  }
};