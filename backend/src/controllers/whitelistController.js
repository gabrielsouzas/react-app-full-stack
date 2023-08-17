const whitelistModel = require('../models/whitelistModel');

const getWhitelist = async (request, response) => {
    try {
        const { token } = request.params;
        const whitelist = await whitelistModel.getWhitelist(token);
        
        if (whitelist) {
            return response.status(200).json({ status: 200, message: "Token encontrado na WhiteList" });
        } else {
            return response.status(401).json({ status: 401, message: "Token não encontrado na WhiteList" });
        }
    } catch (error) {
        return response.status(500).json({ status: 500, message: "Erro ao verificar a WhiteList" });
    }
};

const createWhitelist = async (request, response) => {
    const created = await whitelistModel.createWhitelist(request.body);
    return response.status(201).json(created);
};

const deleteWhitelist = async (request, response) => {
    try {
        const { token } = request.params;
        const whitelistRemoved = await whitelistModel.deleteWhitelist(token);
        
        if (whitelistRemoved) {
            return response.status(200).json({ status: 200, message: "Token removido da WhiteList" });
        } else {
            return response.status(401).json({ status: 401, message: "Token não removido da WhiteList" });
        }
    } catch (error) {
        return response.status(500).json({ status: 500, message: "Erro ao remover token da WhiteList" });
    }
};

module.exports = {
    getWhitelist,
    createWhitelist,
    deleteWhitelist,
};