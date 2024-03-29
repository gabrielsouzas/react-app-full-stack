const clienteModel = require("../models/clienteModel");

const getAll = async (request, response) => {
    try {
        const clientes = await clienteModel.getAll();

        if (clientes) {
            return response
                .status(200)
                .json({
                    clientes,
                    status: 200,
                    message: "Dados buscados com sucesso",
                });
        } else {
            return response
                .status(404)
                .json({
                    status: 404,
                    error: "Dados não encontrados",
                    message:
                        "Os dados solicitados não foram encontrados no banco de dados",
                });
        }
    } catch (error) {
        return response
            .status(500)
            .json({
                error: "Erro interno do servidor",
                message: "Erro ao buscar dados no servidor",
            });
    }
};

const getById = async (request, response) => {
    try {
        const { idcliente } = request.params;
        const cliente = await clienteModel.getById(idcliente);

        if (cliente) {
            return response
                .status(200)
                .json({
                    cliente,
                    status: 200,
                    message: "Dados buscados com sucesso",
                });
        } else {
            return response
                .status(404)
                .json({
                    status: 404,
                    error: "Dados não encontrados",
                    message:
                        "Os dados solicitados não foram encontrados no banco de dados",
                });
        }
    } catch (error) {
        return response
            .status(500)
            .json({
                error: "Erro interno do servidor",
                message: "Erro ao buscar dados no servidor",
            });
    }
};

const createCliente = async (request, response) => {
    try {
        const createdCliente = await clienteModel.createCliente(request.body);

        if (createdCliente) {
            return response
                .status(201)
                .json({
                    createdCliente,
                    status: 200,
                    message: "Registro inserido com sucesso",
                });
        } else {
            return response
                .status(400)
                .json({
                    status: 404,
                    error: "Erro ao tentar inserir o registro",
                    message:
                        "O registro não pôde ser inserido por dados incorretos, ausentes, ou de alguma forma malformados",
                });
        }
    } catch (error) {
        return response
            .status(500)
            .json({
                error: "Erro interno do servidor",
                message: "Erro ao inserir dados no servidor",
            });
    }
};

const updateCliente = async (request, response) => {
    // Dos parâmetros da requisição tira o id
    const { idcliente } = request.params;

    // Executa a função de atualizar passando o id passado por parâmetro na URL e os dados do cliente pelo body
    await clienteModel.updateCliente(idcliente, request.body);

    // Retorna um status que deu certo (204)
    return response.status(204).json();
};

const deleteCliente = async (request, response) => {
    // Dos parâmetros da requisição tira o id que foi passado na URL
    const { idcliente } = request.params;

    // Executa a função deleteCliente passando o id capturado
    await clienteModel.deleteCliente(idcliente);

    // Retorna um status que deu certo (200)
    return response.status(200).json();
};

module.exports = {
    getAll,
    getById,
    createCliente,
    updateCliente,
    deleteCliente,
};
