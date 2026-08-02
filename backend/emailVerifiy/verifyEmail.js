import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


// SMTP TEST
transporter.verify((error, success) => {

  if (error) {
    console.log("SMTP ERROR:", error);
  } else {
    console.log("SMTP SERVER READY");
  }

});


export const verifyEmail = async (token, email) => {

  try {

    const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;


    console.log("FINAL VERIFY URL:", verifyUrl);
    console.log("SEND TO:", email);


    const mailResponse = await transporter.sendMail({

      from: `"Ekart" <${process.env.MAIL_USER}>`,

      to: email,

      subject: "Email Verification - Ekart",


      html: `

        <div style="
          font-family: Arial;
          padding:20px;
        ">

          <h2 style="color:#ec4899;">
            Welcome to Ekart
          </h2>


          <p>
            Thank you for creating an account with Ekart.
          </p>


          <p>
            Click the button below to verify your email.
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
            If the button does not work, copy this link:
          </p>


          <p>
            ${verifyUrl}
          </p>


          <p>
            This verification link will expire soon.
          </p>


        </div>

      `,
    });


    console.log("MAIL SENT:", mailResponse.messageId);

    console.log("Verification Email Sent Successfully");


  } catch(error) {


    console.log("MAIL ERROR:", error);

    throw error;

  }

};