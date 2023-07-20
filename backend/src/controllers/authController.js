const authModel = require('../models/authModel');

const authUser = async (request, response) => {
    const token = await authModel.authUser(request.body);
    return response.status(200).json(token);
};

module.exports = {
    authUser,
};