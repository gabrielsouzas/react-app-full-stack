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

    const response = await fetch('http://localhost:3333/clientes', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });

    return response;
}

const updateCliente = async (cliente) => {
    const { idcliente } = cliente;
    const response = await fetch(`http://localhost:3333/clientes/${idcliente}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
    });
    return response;
}

const deleteCliente = async (idcliente) => {
    const response = await fetch(`http://localhost:3333/clientes/${idcliente}`, {
        method: 'delete',
    });
    return response;
}

module.exports = {
    fetchClientes,
    fetchClienteById,
    insertCliente,
    updateCliente,
    deleteCliente,
};