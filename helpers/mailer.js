import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import dotenv from "dotenv";
import emailTemplates from "../config/emailTemplates.js";
dotenv.config(); 

const fromEmail = "info@yourstore.com";


console.log("MAIL CONFIG CHECK 👉", {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  user: process.env.MAIL_USERNAME,
});



const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,     // Mailtrap
   port: parseInt(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAILTRAP_USERNAME,
    pass: process.env.MAILTRAP_PASSWORD,
    
  },
});
console.log("MAIL HOST:", process.env.MAIL_HOST);

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      partialsDir: path.resolve("./views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./views"),
  })
);


export const sendDeactivationEmail = async (to, context) => {
  const mailOptions = {
    from: `"Yourstore Team" <${fromEmail}>`,
    to,
    subject: "Your Account Has Been Deactivated",
    template: "account_deactivated", // hbs file name
    context,
  };

  await transporter.sendMail(mailOptions);
};