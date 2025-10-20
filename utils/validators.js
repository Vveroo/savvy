export const validarEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validarSenha = (senha) => {
  const temMinimo = senha.length >= 8;
  const temMaiuscula = /[A-Z]/.test(senha);
  const temEspecial = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(senha);
  return temMinimo && temMaiuscula && temEspecial;
};
