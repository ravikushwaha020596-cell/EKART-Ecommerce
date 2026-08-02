import Brevo from "@getbrevo/brevo";
import "dotenv/config";


const apiInstance = new Brevo.TransactionalEmailsApi();


apiInstance.setApiKey(
Brevo.TransactionalEmailsApiApiKeys.apiKey,
process.env.BREVO_API_KEY
);



export const verifyEmail = async(token,email)=>{


try{


const mail = new Brevo.SendSmtpEmail();


const verifyUrl =
`${process.env.CLIENT_URL}/verify/${token}`;



mail.subject =
"Verify Your Ekart Account";



mail.sender={
name:"Ekart 🛒",
email:process.env.MAIL_FROM
};



mail.to=[
{
email
}
];



mail.htmlContent=`

<h2>
Welcome to Ekart 🛒
</h2>


<p>
Click below to verify your email
</p>


<a href="${verifyUrl}">
Verify Email
</a>


<br><br>

${verifyUrl}


`;



const result =
await apiInstance.sendTransacEmail(mail);


console.log(
"VERIFY EMAIL SENT",
result.body
);


}

catch(error){

console.log(
"VERIFY MAIL ERROR",
error.response?.body || error.message
);


throw error;

}


};