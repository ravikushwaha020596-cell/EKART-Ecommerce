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

});



export const sendOTPMail = async (otp, email) => {

  try {

    await transporter.sendMail({

      from: `"Ekart" <${process.env.MAIL_FROM}>`,

      to: email,

      subject: "Password Reset OTP - Ekart",


      html: `

      <div style="
        font-family: Arial;
        padding:20px;
      ">

        <h2 style="color:#ec4899;">
          Ekart Password Reset
        </h2>


        <p>
          Your OTP is:
        </p>


        <h1>
          ${otp}
        </h1>


        <p>
          This OTP is valid for 10 minutes.
        </p>


        <p>
          Thanks,<br/>
          Ekart Team
        </p>


      </div>

      `,

    });


    console.log("OTP Email Sent Successfully");


  } catch (error) {

    console.log("OTP MAIL ERROR:", error);

    throw error;

  }

};