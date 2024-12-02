const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendMail = asyncHandler(async (data) => {
  // Create a transporter object
  console.log(data);
  
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Corrected SMTP host
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.MAIL_ID, // Gmail email address from environment variables
      pass: process.env.MPASS, // Gmail app password from environment variables
    },
  });

  try {
    // Send the email
    const info = await transporter.sendMail({
      from: process.env.MAIL_ID, // Sender address (must match authenticated user)
      to: data.to, // List of recipients
      subject: data.subject, // Subject line
      text: data.text, // Plain text body
      html: data.html, // HTML body
    });

    console.log("Message sent: %s", info.messageId); // Log the message ID
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
});

module.exports = sendMail;
