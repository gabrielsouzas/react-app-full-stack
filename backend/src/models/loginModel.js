const connection = require('./connection');

const authLogin = async (login) => {
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
        }
    
        // A senha está correta, o usuário pode prosseguir
        console.log('Usuário autenticado com sucesso');
        return true;
      } catch (error) {
        console.error('Erro na autenticação:', error);
      } finally {
        connection.end(); // Fecha a conexão com o banco de dados
      }
};

const getAll = async () => {
    const [logins] = await connection.execute('SELECT * FROM logins');
    return logins;
};

const getById = async (idlogin) => {
    const query = 'SELECT * FROM logins WHERE idlogin = ?';
    const [login] = await connection.execute(query, [idlogin]);
    return login;
};

const createLogin = async (login) => {
    const { usuario, senha } = login;

    // Insere os dados do login no banco
    const query = 'INSERT INTO logins(usuario, senha) VALUES (?,?)';
    const [createdLogin] = await connection.execute(query, [usuario, senha]);

    // Retorna apenas o ID inserido
    return {insertId: createdLogin.insertId};
}

// Método que atualiza um login do bd
const updateLogin = async (idlogin, login) => {
    const { usuario, senha } = login;

    const [updatedLogin] = await connection.execute('UPDATE logins SET usuario = ?, senha = ? WHERE idlogin = ?', [usuario, senha,  idlogin]);
    return updatedLogin;
};

// Método que deleta um login do bd
const deleteLogin = async (idlogin) => {
    const [removedLogin] = await connection.execute('DELETE FROM logins WHERE idlogin = ?', [idlogin]);
    return removedLogin;
};


module.exports = {
    getAll,
    getById,
    createLogin,
    updateLogin,
    deleteLogin,
};