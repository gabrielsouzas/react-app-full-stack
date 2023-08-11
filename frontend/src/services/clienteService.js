import fetchWrapper from '../interceptors/fetchWrapper';

export const fetchClientes = async () => {
  const response = await fetchWrapper('/clientes', {
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
};

export const fetchClienteById = async (idcliente) => {
  const response = await fetchWrapper(`/cliente/${idcliente}`);
  const data = await response.json();
  return data;
};

export const insertCliente = async (cliente) => {

  const response = await fetchWrapper('/clientes', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });

  return response;
};

export const updateCliente = async (cliente) => {
  const { idcliente } = cliente;
  const response = await fetchWrapper(`/clientes/${idcliente}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente),
  });
  return response;
};

export const deleteCliente = async (idcliente) => {
  const response = await fetchWrapper(`/clientes/${idcliente}`, {
    method: 'delete',
  });
  return response;
};
