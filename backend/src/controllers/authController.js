const authModel = require('../models/authModel');

const authUser = async (request, response) => {
    const token = await authModel.authUser(request.body);
    return response.json(token);
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

module.exports = {
    authUser,
    verifyToken,
};