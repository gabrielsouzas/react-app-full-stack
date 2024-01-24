const connection = require('./connection');

const getAll = async () => {
  try {
    const [clientes] = await connection.execute('SELECT * FROM clientes');
    return clientes;
  } catch (error) {
    console.log(`Erro ao tentar buscar os registros no banco de dados. Erro: ${error}`);
    return null;
  }
};

const getById = async (idcliente) => {
    try {
      const query = 'SELECT * FROM clientes WHERE idcliente = ?';
      const [cliente] = await connection.execute(query, [idcliente]);
      return cliente;
    } catch (error) {
      console.log(`Erro ao tentar buscar o registro no banco de dados. Erro: ${error}`);
      return null;
    }
};

const createCliente = async (cliente) => {
    try {
      const { nome, nomeabreviado, cpf, telefone, ativo } = cliente;

      // Insere os dados do cliente no banco
      const query = 'INSERT INTO clientes(nome, nomeabreviado, cpf, telefone, ativo) VALUES (?,?,?,?,?)';
      const [createdCliente] = await connection.execute(query, [nome, nomeabreviado, cpf, telefone, ativo]);
  
      // Retorna apenas o ID inserido
      return {insertId: createdCliente.insertId};
    } catch {
      console.log(`Erro ao tentar inserir o registro no banco de dados. Erro: ${error}`);
      return null;
    }
}

// Método que atualiza um cliente do bd
const updateCliente = async (idcliente, cliente) => {
    try {
      const { nome, nomeabreviado, cpf, telefone, ativo } = cliente;

      const [updatedCliente] = await connection.execute('UPDATE clientes SET nome = ?, nomeabreviado = ?, cpf = ?, telefone = ?, ativo = ? WHERE idcliente = ?', [nome, nomeabreviado, cpf, telefone, ativo, idcliente]);
      return updatedCliente;
    } catch {
      console.log(`Erro ao tentar atualizar o registro no banco de dados. Erro: ${error}`);
      return null;
    }
};

// Método que deleta um cliente do bd
const deleteCliente = async (idcliente) => {
    try {
      const [removedCliente] = await connection.execute('DELETE FROM clientes WHERE idcliente = ?', [idcliente]);
      return removedCliente;
    } catch {
      console.log(`Erro ao tentar deletar o registro no banco de dados. Erro: ${error}`);
      return null;
    }
};


module.exports = {
    getAll,
    getById,
    createCliente,
    updateCliente,
    deleteCliente,
};
