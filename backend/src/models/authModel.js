const connection = require('./connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const authUser = async (login) => {
    const { usuario, senha } = login;

    try {
        // Busca o usuário pelo nome de usuário no banco de dados
        const query = 'SELECT * FROM logins WHERE usuario = ?';
        const [rows] = await connection.execute(query, [usuario]);
        //return rows;
        //const [rows] = await connection.query('SELECT * FROM usuarios WHERE username = ?', [username]);
    
        if (rows.length === 0) {
          throw new Error('Usuário não encontrado');
        }
    
        const user = rows[0];
        // Compara a senha fornecida com o hash armazenado no banco de dados
        const senhaCorrespondente = await bcrypt.compare(senha, user.senha);
    
        if (!senhaCorrespondente) {
          throw new Error('Senha incorreta');
        } else {
            // Cria um token JWT com um payload contendo as informações relevantes do usuário
            const token = jwt.sign({ usuario }, secretKey, { expiresIn: '1h' });

            // Retorna o token para o frontend
            res.json({ token });
        } 
        /*else {
            res.status(401).json({ error: 'Credenciais inválidas' });
        }*/
    
        // A senha está correta, o usuário pode prosseguir
        console.log('Usuário autenticado com sucesso');
        return true;
      } catch (error) {
        console.error('Erro na autenticação:', error);
      } finally {
        connection.end(); // Fecha a conexão com o banco de dados
      }
};

module.exports = {
    authUser,
};