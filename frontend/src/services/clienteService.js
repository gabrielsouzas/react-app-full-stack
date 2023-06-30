
const fetchClientes = async () => {
    const response = await fetch('http://localhost:3333/clientes');
    const data = await response.json();
    return data;
}

module.exports = {
    fetchClientes,
};