const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

/*const verifyToken = (req, res, next) => {
  
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    // Se o token é válido, você pode adicionar o usuário decodificado (ou informações relevantes) ao objeto 'req' para uso posterior
    
    req.user = decoded;

    // Chame o próximo middleware ou o controlador de rota, se o token for válido
    next();
  });
};*/

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId; // Adicione o ID do usuário ao objeto de solicitação
    next(); // Continue para a próxima função
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = {
  authenticateToken,
};
