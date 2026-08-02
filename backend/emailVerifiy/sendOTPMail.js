import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({

  host: "smtp-relay.brevo.com",

  port: 587,

  secure: false,

  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },

  requireTLS: true,

});




export const sendOTPMail = async (otp, email) => {

  try {


    const info = await transporter.sendMail({

      from: `"Ekart 🛒" <${process.env.MAIL_FROM}>`,

      to: email,

      subject: "Ekart Password Reset OTP",


      html: `

      <div style="font-family:Arial">

        <h2>
        Ekart Password Reset 🛒
        </h2>


        <p>
        Your OTP is:
        </p>


        <h1 style="
        color:#ec4899;
        letter-spacing:5px;
        font-size:35px;
        ">

        ${otp}

        </h1>



        <p>
        This OTP is valid for 
        <b>10 minutes</b>.
        </p>



        <p>
        If you did not request this,
        ignore this email.
        </p>



        <br>


        <p>
        Regards,<br>
        Ekart Team
        </p>


      </div>

      `

    });



    console.log(
      "✅ OTP Email Sent:",
      info.messageId
    );



  } catch(error) {


    console.error(
      "OTP MAIL ERROR:",
      error.message
    );


    throw error;


  }

};