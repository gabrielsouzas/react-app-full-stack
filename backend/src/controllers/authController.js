const authModel = require('../models/authModel');

const authUser = async (request, response) => {
    const isUserAuthenticated = await authModel.authUser(request.body);
    return response.status(200).json(isUserAuthenticated);
};

module.exports = {
    authUser,
};