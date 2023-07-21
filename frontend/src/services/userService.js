const fetchUsers = async () => {
  const response = await fetch('http://localhost:3333/users');
  const data = await response.json();
  return data;
};

const fetchUserById = async (iduser) => {
  const response = await fetch(`http://localhost:3333/user/${iduser}`);
  const data = await response.json();
  return data;
};

const insertUser = async (user) => {

  const response = await fetch('http://localhost:3333/users', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  return response;
};

const updateUser = async (user) => {
  const { iduser } = user;
  const response = await fetch(`http://localhost:3333/users/${iduser}`, {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return response;
};

const deleteUser = async (iduser) => {
  const response = await fetch(`http://localhost:3333/users/${iduser}`, {
    method: 'delete',
  });
  return response;
};

// eslint-disable-next-line no-undef
module.exports = {
  fetchUsers,
  fetchUserById,
  insertUser,
  updateUser,
  deleteUser,
};
