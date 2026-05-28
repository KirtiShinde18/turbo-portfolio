import nodemailer from "nodemailer";

type SendEmailParams = {
  email: string;
  subject: string;
  message: string;
};

export const sendEmail = async ({
  email,
  subject,
  message,
}: SendEmailParams): Promise<string> => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL as string,
        pass: process.env.EMAIL_PASS as string,
      },
    });

    await transport.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      html: message,
    });

    return "Email sent successfully 💌";
  } catch (error) {
    console.log("Email error:", error);
    throw new Error("Unable to send email");
  }
};