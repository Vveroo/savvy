const crypto = require('crypto');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../utils/mailer');

let resetCodes = {}; // Simulação de armazenamento de códigos
let users = [
  { email: 'veronica@email.com', password: '$2b$10$abc123...' } // senha criptografada
];

exports.sendResetCode = async (req, res) => {
  const { email } = req.body;
  const userExists = users.find(u => u.email === email);

  if (!userExists) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = Date.now() + 15 * 60 * 1000;

  resetCodes[email] = { code, expiresAt };

  try {
    await sendEmail(email, code);
    res.status(200).json({ message: 'Código enviado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao enviar e-mail' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, code, newPassword } = req.body;
  const record = resetCodes[email];
  const userIndex = users.findIndex(u => u.email === email);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }

  if (!record || record.code !== code) {
    return res.status(400).json({ message: 'Código inválido' });
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ message: 'Código expirado' });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    users[userIndex].password = hashedPassword;
    delete resetCodes[email];

    res.status(200).json({ message: 'Senha redefinida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar senha' });
  }
};
