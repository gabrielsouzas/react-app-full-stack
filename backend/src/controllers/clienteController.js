const clienteModel = require('../models/clienteModel');

const getAll = async (request, response) => {
    const cliente = await clienteModel.getAll();
    return response.status(200).json(cliente);
    //return cliente;
};

module.exports = {
    getAll,
};