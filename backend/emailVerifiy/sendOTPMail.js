import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({

  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },

});



export const sendOTPMail = async (otp, email) => {

  try {


    console.log("OTP SEND TO:", email);


    const mailResponse = await transporter.sendMail({

      from: `"Ekart" <${process.env.MAIL_USER}>`,

      to: email,

      subject: "Password Reset OTP - Ekart",


      html: `

        <div style="
          font-family: Arial;
          padding:20px;
        ">

          <h2 style="color:#ec4899;">
            Password Reset
          </h2>


          <p>
            Your OTP for password reset is:
          </p>


          <h1 style="color:#ec4899;">
            ${otp}
          </h1>


          <p>
            This OTP is valid for 10 minutes.
          </p>


        </div>

      `,

    });



    console.log("OTP MAIL SENT:", mailResponse.messageId);

    console.log("OTP Email Sent Successfully");


  } catch(error) {


    console.log("OTP MAIL ERROR:", error);

    throw error;

  }

};