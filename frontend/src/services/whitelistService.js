import fetchWrapper from '../interceptors/fetchWrapper';

export const fetchWhitelist = async (token) => {
  const response = await fetchWrapper(`/whitelist/${token}`);
  const data = await response.json();
  return data;
};

export const insertWhitelist = async (whitelist) => {
  const response = await fetchWrapper('/whitelist', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(whitelist),
  });
  return response;
};

export const deleteWhitelist = async (token) => {
  const response = await fetchWrapper(`/whitelist/${token}`, {
    method: 'delete',
  });
  return response;
};
