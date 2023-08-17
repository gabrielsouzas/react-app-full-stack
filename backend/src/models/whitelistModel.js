const connection = require('./connection');

const getWhitelist = async (token) => {
    const query = 'SELECT COUNT(*) AS count FROM whitelist WHERE token = ?';
    const [whitelist] = await connection.execute(query, [token]);
    return whitelist;
};

const createWhitelist = async (whitelist) => {
    const { authToken } = whitelist;
    const query = 'INSERT INTO whitelist(token) VALUES (?)';
    const [createdWhitelist] = await connection.execute(query, [authToken]);
    return {insertId: createdWhitelist.insertId};
}

const deleteWhitelist = async (token) => {
    const [removedWhitelist] = await connection.execute('DELETE FROM whitelist WHERE token LIKE ?', [token]);
    console.log(removedWhitelist);
    return removedWhitelist;
};


module.exports = {
    getWhitelist,
    createWhitelist,
    deleteWhitelist,
};