const fetchClientes = async () => {
    const response = await fetch('http://localhost:3333/clientes');
    const data = await response.json();
    return data;
}

const fetchClienteById = async (idcliente) => {
    const response = await fetch(`http://localhost:3333/cliente/${idcliente}`);
    const data = await response.json();
    return data;
}

const insertCliente = async (cliente) => {

    await fetch('http://localhost:3333/clientes', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });

}

const updateCliente = async (cliente) => {
    const { idcliente } = cliente;
    await fetch(`http://localhost:3333/clientes/${idcliente}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });
}

const deleteCliente = async (idcliente) => {
    await fetch(`http://localhost:3333/clientes/${idcliente}`, {
        method: 'delete',
    });
}

module.exports = {
    fetchClientes,
    fetchClienteById,
    insertCliente,
    updateCliente,
    deleteCliente,
};