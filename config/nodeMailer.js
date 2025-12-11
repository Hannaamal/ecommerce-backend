import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

// Set the "from" email
const fromEmail = "info@limenzydev.com";

// Create transport
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

// Handlebars template options
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

// Use handlebars with the transporter
transport.use("compile", hbs(handlebarOptions));

/**
 * Send email function
 * @param {string} to - Recipient email
 * @param {string} subject - Email subject
 * @param {string} template - Handlebars template name
 * @param {object} context - Template context
 */
export const sendResetPasswordOtpEmail = async (to, subject, template, context) => {
  const mailOptions = {
    from: `"Limenzy Team" <${fromEmail}>`,
    to,
    subject,
    template,
    context,
    headers: {
      "X-MT-Category": "Reset-password-otp",
    },
  };

  try {
    const info = await transport.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Nodemailer error sending email:", error);
  }
};
