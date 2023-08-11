const connection = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authUser = async (login) => {
    const { username, password } = login;

    try {
        // Busca o usuário pelo nome de usuário no banco de dados
        const query = 'SELECT * FROM users WHERE username = ?';
        const [rows] = await connection.execute(query, [username]);
        
        if (rows.length === 0) {
          //throw new Error('Usuário não encontrado');
          return ({
            status: 'error',
            message: 'Usuário não encontrado'
          });
        }
    
        const user = rows[0];

        // Compara a password fornecida com o hash armazenado no banco de dados
        const senhaCorrespondente = await bcrypt.compare(password, user.password);
        
        //const senhaCorrespondente = username === 'super' && password === 'super' ? true : false;
    
        if (!senhaCorrespondente) {
          //throw new Error('Senha incorreta');
          return ({
            status: 'error',
            message: 'Senha incorreta'
          });
        } else {
            // Cria um token JWT com um payload contendo as informações relevantes do usuário
            const accessToken = jwt.sign({ iduser: user.iduser, username }, secretKey, { expiresIn: '1h' });

            // Gera refreshToken
            const refreshToken = jwt.sign({ iduser: user.iduser, username }, secretKey, { expiresIn: '1d' });

            //res.json({ accessToken, refreshToken });

            // Retorna o token para o frontend
            console.log('Usuário autenticado com sucesso');
            
            return {accessToken, refreshToken};
        } 
        /*else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }*/
    
        // A password está correta, o usuário pode prosseguir
        
      } catch (error) {
        console.error('Erro na autenticação:', error);
      } finally {
        //connection.end(); // Fecha a conexão com o banco de dados
      }
};

const verifyToken = (req) => {
  //const res = {};
  const token = req.headers['authorization'];
  
  try {
    if (!token) {
      /*return ({
        status: '401',
        message: 'Token not provided'
      });*/
      //console.log('não acho token')
      return false; //res.status(401).json({ error: 'Token not provided.' });
    }
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return false; //res.status(401).json({ error: 'Invalid token.' });
      }

      // Se o token é válido, você pode adicionar o usuário decodificado (ou informações relevantes) ao objeto 'req' para uso posterior
      req.user = decoded;

    });
    //console.log()
    return req.user;
  } catch (error) {
    console.log(error);
  }
};

const refreshToken = async (req) => {
  const { refreshToken } = req.headers['authorization'];;

  if (!refreshToken) {
    throw new NotFoundException('Token do usuário não fornecido');
  }

  const iduser = jwt.decode(refreshToken)['iduser'];

  // Busca o usuário pelo id de usuário no banco de dados
  const query = 'SELECT * FROM users WHERE iduser = ?';
  const [rows] = await connection.execute(query, [iduser]);

  if (rows.length === 0) {
    //throw new Error('Usuário não encontrado');
    return ({
      status: 'error',
      message: 'Usuário não encontrado'
    });
  }

  const user = rows[0];

  // Gera um novo accessToken
  const newAccessToken = jwt.sign({ iduser: user.iduser }, secretKey, { expiresIn: '1h' });

  return { accessToken: newAccessToken };
};

module.exports = {
    authUser,
    verifyToken,
    refreshToken,
};