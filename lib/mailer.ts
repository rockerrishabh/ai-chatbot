import nodemailer from "nodemailer";

type Props = {
  html: string;
  to: string;
  subject: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.GMAIL_SMTP_HOST,
  port: Number(process.env.GMAIL_SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.GMAIL_SMTP_EMAIL_ADDRESS,
    pass: process.env.GMAIL_SMTP_PASSWORD,
  },
});

export async function sendMail({ html, to, subject }: Props) {
  try {
    const info = await transporter.sendMail({
      from: '"AI ChatBot 👻" <process.env.GMAIL_SMTP_EMAIL_ADDRESS>',
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error(error);
  }
}
