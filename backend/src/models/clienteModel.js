const connection = require('./connection');

const getAll = async () => {
    /*const [clientes] = await connection.execute('SELECT * FROM clientes', (err, result) => {
        if(err) console.log(err);
        console.log(clientes);
    })
    return clientes;*/

    const [clientes] = await connection.execute('SELECT * FROM clientes');
    return clientes;
};

module.exports = {
    getAll,
};