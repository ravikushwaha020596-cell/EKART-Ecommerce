import { Resend } from "resend";
import "dotenv/config";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendOTPMail = async (otp, email) => {

  try {

    await resend.emails.send({

      from: "Ekart <onboarding@resend.dev>",

      to: email,

      subject: "Password Reset OTP",

      html: `
        <h2>Password Reset</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for 10 minutes.</p>
      `,
    });


    console.log("OTP Email Sent Successfully");


  } catch(error){

    console.log("OTP MAIL ERROR:", error);

    throw error;
  }
};