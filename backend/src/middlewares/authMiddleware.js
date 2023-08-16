const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.iduser = decoded.iduser; // ID do usuário adicionado ao objeto de solicitação
    next(); // Continua para a próxima função
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = {
  authenticateToken,
};
