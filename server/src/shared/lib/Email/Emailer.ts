// emailer.ts
import nodemailer from 'nodemailer';

export const Emailer = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Directly use Gmail service
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.GOOGLE_API_KEY, // Google App Password
    },
  });

  const mailOptions = {
    from: `"My App" <${process.env.EMAIL_USER}>`, // sender
    to,
    subject, 
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};
