const clienteModel = require('../models/clienteModel');

const getAll = async (request, response) => {
    const cliente = await clienteModel.getAll();
    return response.status(200).json(cliente);
};

const getById = async (request, response) => {
    const { idcliente } = request.params;
    const cliente = await clienteModel.getById(idcliente);
    return response.status(200).json(cliente);
};

const createCliente = async (request, response) => {
    // Executa o método createCliente do Model passando o body
    const createdCliente = await clienteModel.createCliente(request.body);
    // Retorna um json de resposta da operação de inserção
    return response.status(201).json(createdCliente);
};

const updateCliente = async (request, response) => {
    // Dos parâmetros da requisição tira o id
    const { idcliente } = request.params;

    // Executa a função de atualizar passando o id passado por parâmetro na URL e os dados da cliente pelo body
    await clienteModel.updateCliente(idcliente, request.body);

    // Retorna um status que deu certo (204)
    return response.status(204).json();
    
};

const deleteCliente = async (request, response) => {
    // Dos parâmetros da requisição tira o id que foi passado na URL
    const { idcliente } = request.params;
    
    // Executa a função deleteCliente passando o id capturado
    await clienteModel.deleteCliente(idcliente);

    // Retorna um status que deu certo (204)
    return response.status(204).json();
};

module.exports = {
    getAll,
    getById,
    createCliente,
    updateCliente,
    deleteCliente,
};