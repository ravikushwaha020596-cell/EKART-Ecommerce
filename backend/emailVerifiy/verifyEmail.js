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



export const verifyEmail = async (token, email) => {

  try {

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;


    await transporter.sendMail({

      from: `"Ekart" <${process.env.MAIL_FROM}>`,

      to: email,

      subject: "Email Verification - Ekart",


      html: `

      <div style="
        font-family: Arial;
        padding:20px;
        background:#f9fafb;
      ">

        <h2 style="color:#ec4899;">
          Welcome to Ekart
        </h2>


        <p>
          Thank you for registering with Ekart.
        </p>


        <p>
          Please verify your email by clicking the button below.
        </p>



        <a href="${verifyUrl}"
        style="
          display:inline-block;
          padding:12px 25px;
          background:#ec4899;
          color:white;
          text-decoration:none;
          border-radius:5px;
        ">
          Verify Email
        </a>



        <br/><br/>


        <p>
          If button does not work, copy this link:
        </p>


        <p>
          ${verifyUrl}
        </p>


        <p>
          Thanks,<br/>
          Ekart Team
        </p>


      </div>

      `,
    });


    console.log("Verification Email Sent Successfully");


  } catch (error) {

    console.log("MAIL ERROR:", error);

    throw error;

  }

};