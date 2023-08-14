const authModel = require('../models/authModel');

const authUser = async (request, response) => {
    //const { acessToken, refreshToken } = await authModel.authUser(request.body);
    //return response.json({ acessToken, refreshToken });

    const tokens = await authModel.authUser(request.body);
    return response.json(tokens);
};

const verifyToken = async (request, response) => {
    //const data = await authModel.verifyToken(request);
    //return response.json(data);

    try {
        const tokenValid = await authModel.verifyToken(request);
        
        if (tokenValid) {
            return response.status(200).json({ status: 200, message: "Token validado" });
        } else {
            return response.status(401).json({ status: 401, message: "Token inválido" });
        }
    } catch (error) {
        return response.status(500).json({ status: 500, message: "Erro ao verificar o token" });
    }
};

const refreshToken = async (request, response) => {
    try {
        const refreshToken = await authModel.refreshToken(request);
        
        if (refreshToken) {
            return response.status(200).json({ status: 200, message: "Refresh Token validado", refreshToken });
        } else {
            return response.status(401).json({ status: 401, message: "Refresh Token inválido" });
        }
    } catch (error) {
        return response.status(500).json({ status: 500, message: "Erro ao verificar o refresh token" });
    }
};


module.exports = {
    authUser,
    verifyToken,
    refreshToken,
};