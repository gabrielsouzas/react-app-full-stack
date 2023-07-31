import '../shim';
import jwt from 'jsonwebtoken';

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken || !decodedToken.exp) {
      // Token inválido ou sem data de expiração
      return true;
    }

    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  } catch (error) {
    // Erro ao decodificar o token
    return true;
  }
};
