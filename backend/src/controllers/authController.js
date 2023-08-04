const authModel = require('../models/authModel');

const authUser = async (request, response) => {
    const token = await authModel.authUser(request.body);
    return response.json(token);
};

const verifyToken = async (request, response) => {
    const data = await authModel.verifyToken(request);
    return response.json(data);
};

module.exports = {
    authUser,
    verifyToken,
};