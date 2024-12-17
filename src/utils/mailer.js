import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "aniiko.magdi@gmail.com",
    pass: "kofu bfza olox ydoo",
  },
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: '"INSERV-CHILE" <aniiko.magdi@gmail.com>',
      to,
      subject,
      text,
      html,
    });
    console.log(`Correo enviado a ${to}`);
  } catch (error) {
    console.error("Error al enviar correo:", error.message);
  }
};
