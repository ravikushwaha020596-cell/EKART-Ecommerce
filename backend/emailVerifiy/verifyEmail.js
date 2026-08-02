import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({

  host: "smtp.gmail.com",

  port: 587,

  secure: false,

  requireTLS: true,

  family: 4,

  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  }

});


export const verifyEmail = async (token, email) => {

  try {

    const verifyUrl =
      `${process.env.CLIENT_URL}/verify/${token}`;


    console.log("VERIFY URL:", verifyUrl);
    console.log("SEND TO:", email);


    await transporter.sendMail({

      from: `"Ekart" <${process.env.MAIL_USER}>`,

      to: email,

      subject: "Email Verification",

      html: `

        <h2>Welcome to Ekart</h2>

        <p>Click below to verify your email</p>


        <a href="${verifyUrl}"
        style="
        display:inline-block;
        padding:10px 20px;
        background:#ec4899;
        color:white;
        text-decoration:none;
        border-radius:5px;
        ">
          Verify Email
        </a>


        <br/><br/>


        <p>If button is not working, open this link:</p>

        <p>${verifyUrl}</p>

      `

    });


    console.log("Verification Email Sent Successfully");


  } catch(error) {

    console.log("VERIFY EMAIL ERROR:", error.message);

    throw error;

  }

};