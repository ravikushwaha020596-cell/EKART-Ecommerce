import nodemailer from "nodemailer";
import dns from "dns";
import "dotenv/config";

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});