const connection = require('./connection');

const getAll = async () => {
    const [clientes] = await connection.execute('SELECT * FROM clientes');
    return clientes;
};

const createCliente = async (cliente) => {

    const { nome } = cliente;

    // Insere os dados do cliente no banco
    const query = 'INSERT INTO clientes(nome) VALUES (?)';
    const [createdCliente] = await connection.execute(query, [nome]);

    // Retorna apenas o ID inserido
    return {insertId: createdCliente.insertId};
}

// Método que atualiza um cliente do bd
const updateCliente = async (idcliente, cliente) => {
    const { nome } = cliente;

    const [updatedCliente] = await connection.execute('UPDATE clientes SET nome = ? WHERE idcliente = ?', [nome, idcliente]);
    return updatedCliente;
};

// Método que deleta um cliente do bd
const deleteCliente = async (idcliente) => {
    const [removedCliente] = await connection.execute('DELETE FROM clientes WHERE idcliente = ?', [idcliente]);
    return removedCliente;
};


module.exports = {
    getAll,
    createCliente,
    updateCliente,
    deleteCliente,
};