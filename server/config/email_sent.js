const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (to, subject, text, html) => {
  console.log("Sending email to:", to);
  if (!to || !subject) {
    throw new Error("Recipient email and subject are required");
  }
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text ? text : undefined,
      html: html ? html : undefined,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };
