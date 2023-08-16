const connection = require('./connection');

const getWhitelist = async (token) => {
    const query = 'SELECT * FROM whitelist WHERE token = ?';
    const [whitelist] = await connection.execute(query, [token]);
    return whitelist;
};

const createWhitelist = async (whitelist) => {
    const { token } = whitelist;
    const query = 'INSERT INTO whitelist(token) VALUES (?)';
    const [createdWhitelist] = await connection.execute(query, [token]);
    return {insertId: createdWhitelist.insertId};
}

const deleteWhitelist = async (token) => {
    const [removedWhitelist] = await connection.execute('DELETE FROM whitelist WHERE token = ?', [token]);
    return removedWhitelist;
};


module.exports = {
    getWhitelist,
    createWhitelist,
    deleteWhitelist,
};