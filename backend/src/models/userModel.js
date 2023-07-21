const connection = require('./connection');

//import { generateHashPassword } from '../utils/hash';
const hash = require('../utils/hash');

const getAll = async () => {
    const [users] = await connection.execute('SELECT * FROM users');
    return users;
};

const getById = async (iduser) => {
    const query = 'SELECT * FROM users WHERE iduser = ?';
    const [user] = await connection.execute(query, [iduser]);
    return user;
};

const createUser = async (user) => {
    const { username, password, email } = user;

    // Cria o hash para a senha passada
    const hashPassword = await hash.generateHashPassword(password);

    // Insere os dados do user no banco
    const query = 'INSERT INTO users(username, password, email) VALUES (?,?,?)';
    const [createdUser] = await connection.execute(query, [username, hashPassword, email]);

    // Retorna apenas o ID inserido
    return {insertId: createdUser.insertId};
}

// Método que atualiza um user do bd
const updateUser = async (iduser, user) => {
    const { username, password } = user;

    const [updatedUser] = await connection.execute('UPDATE users SET username = ?, password = ? WHERE iduser = ?', [username, password,  iduser]);
    return updatedUser;
};

// Método que deleta um user do bd
const deleteUser = async (iduser) => {
    const [removedUser] = await connection.execute('DELETE FROM users WHERE iduser = ?', [iduser]);
    return removedUser;
};


module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser,
};