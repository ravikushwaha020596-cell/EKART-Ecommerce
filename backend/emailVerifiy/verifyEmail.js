import nodemailer from "nodemailer";
import "dotenv/config";


const transporter = nodemailer.createTransport({

  service:"gmail",

  auth:{
    user:process.env.MAIL_USER,
    pass:process.env.MAIL_PASS,
  }

});


export const verifyEmail = async(token,email)=>{

try{

const verifyUrl =
`${process.env.CLIENT_URL}/verify/${token}`;


await transporter.sendMail({

from:`"Ekart" <${process.env.MAIL_USER}>`,

to:email,

subject:"Email Verification",

html:`

<h2>Welcome to Ekart</h2>

<p>Click below to verify your email</p>

<a href="${verifyUrl}">
Verify Email
</a>

<br/>

${verifyUrl}

`

});


console.log("Verification Email Sent");


}catch(error){

console.log(error);

throw error;

}

}