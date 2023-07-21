const bcrypt = require('bcrypt');

// Função para gerar o hash da senha usando bcrypt
const generateHashPassword = async (password) => {
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (error) {
      throw new Error('Erro ao gerar hash da senha:', error);
    }
}

module.exports = {
  generateHashPassword
}
