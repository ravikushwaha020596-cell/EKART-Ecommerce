import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({

  host: process.env.SMTP_HOST,

  port: Number(process.env.SMTP_PORT),

  secure:false,

  requireTLS:true,

  auth:{
    user:process.env.SMTP_USER,
    pass:process.env.SMTP_PASS,
  },

  connectionTimeout:10000,
  greetingTimeout:10000,
  socketTimeout:10000,

});



export const sendOTPMail = async(otp,email)=>{

try{


await transporter.sendMail({

from:`"Ekart" <${process.env.MAIL_FROM}>`,

to:email,

subject:"Password Reset OTP - Ekart",


html:`

<div style="font-family:Arial">

<h2>Ekart Password Reset</h2>

<p>Your OTP is:</p>

<h1>${otp}</h1>

<p>This OTP is valid for 10 minutes.</p>


</div>

`

});


console.log("OTP Email Sent Successfully");


}catch(error){

console.log("OTP MAIL ERROR:",error);

throw error;

}


};