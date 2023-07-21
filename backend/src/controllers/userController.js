const userModel = require('../models/userModel');

const getAll = async (request, response) => {
    const user = await userModel.getAll();
    return response.status(200).json(user);
};

const getById = async (request, response) => {
    const { iduser } = request.params;
    const user = await userModel.getById(iduser);
    return response.status(200).json(user);
};

const createUser = async (request, response) => {
    // Executa o método createUser do Model passando o body
    const createdUser = await userModel.createUser(request.body);
    // Retorna um json de resposta da operação de inserção
    return response.status(201).json(createdUser);
};

const updateUser = async (request, response) => {
    // Dos parâmetros da requisição tira o id
    const { iduser } = request.params;

    // Executa a função de atualizar passando o id passado por parâmetro na URL e os dados do user pelo body
    await userModel.updateUser(iduser, request.body);

    // Retorna um status que deu certo (204)
    return response.status(204).json();
    
};

const deleteUser = async (request, response) => {
    // Dos parâmetros da requisição tira o id que foi passado na URL
    const { iduser } = request.params;
    
    // Executa a função deleteUser passando o id capturado
    await userModel.deleteUser(iduser);

    // Retorna um status que deu certo (200)
    return response.status(200).json();
};

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser,
};