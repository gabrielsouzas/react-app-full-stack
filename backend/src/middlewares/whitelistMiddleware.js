const { getWhitelist } = require("../models/whitelistModel");


const checkTokenInWhitelist = async (req, res, next) => {

  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
      const result = await getWhitelist(token);
      const isTokenValid = result.length > 0 && result[0].count > 0;
      
      if (isTokenValid) {
          next(); // Token válido
      } else {
          res.status(403).json({ error: 'Token não autorizado' });
      }
  } catch (error) {
      res.status(500).json({ error: 'Erro ao verificar o token' });
  }
};

module.exports = {
  checkTokenInWhitelist,
};
