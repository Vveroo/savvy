const nodemailer = require('nodemailer');

exports.sendEmail = async (to, code) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Suporte" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Código de recuperação de senha',
    text: `Seu código de verificação é: ${code}`,
  });
};
