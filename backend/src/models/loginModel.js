const connection = require('./connection');

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