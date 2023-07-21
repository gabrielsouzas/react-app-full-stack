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
          throw new Error('Usuário não encontrado');
        }
    
        const user = rows[0];

        // Compara a password fornecida com o hash armazenado no banco de dados
        const senhaCorrespondente = await bcrypt.compare(password, user.password);
        
        //const senhaCorrespondente = username === 'super' && password === 'super' ? true : false;
    
        if (!senhaCorrespondente) {
          throw new Error('Senha incorreta');
        } else {
            // Cria um token JWT com um payload contendo as informações relevantes do usuário
            const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

            // Retorna o token para o frontend
            console.log('Usuário autenticado com sucesso');
            return token;
        } 
        /*else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }*/
    
        // A password está correta, o usuário pode prosseguir
        
      } catch (error) {
        console.error('Erro na autenticação:', error);
      } finally {
        connection.end(); // Fecha a conexão com o banco de dados
      }
};

module.exports = {
    authUser,
};