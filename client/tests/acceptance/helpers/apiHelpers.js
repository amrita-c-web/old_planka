const axios = require('axios');
const { testUsers, testProjects } = require('./globals');
const { client } = require('nightwatch-api');

const baseUrl = process.env.API_SERVER_URL || 'http://localhost:1337/api';
const fetch = axios.create({ baseURL: baseUrl });

function getAdminAuthToken() {
  const {
    globals: { adminUser },
  } = client;

  return fetch
    .post('/access-tokens', {
      emailOrUsername: adminUser.email,
      password: adminUser.password,
    })
    .then(({ data: { item } }) => item)
    .catch((err) => console.log(err.response.data.message));
}

async function setAuthHeader(user = '') {
  let token = '';
  if (!user) {
    token = await getAdminAuthToken();
  } else {
    token = await getAuthToken(user);
  }
  fetch.defaults.headers.common.Authorization = 'Bearer ' + token;
}

function getAuthToken(user) {
  let email = '';
  let password = '';
  testUsers.forEach((testUser) => {
    if (testUser.name === user) {
      email = testUser.email;
      password = testUser.password;
    }
  });
  return fetch
    .post('/access-tokens', {
      emailOrUsername: email,
      password: password,
    })
    .then(({ data: { item } }) => item)
    .catch((err) => console.log(err.response.data.message));
}

async function createUser(user) {
  await setAuthHeader();
  try {
    const {
      data: { item },
    } = await fetch.post('/users', { ...user });
    const { id, email, name, username } = item;
    const userInfo = {
      id,
      email,
      name,
      username,
      password: user.password,
    };
    testUsers.push(userInfo);

    if (user.hasOwnProperty('isAdmin')) {
      await fetch.patch('/users/' + id, { isAdmin: Boolean(user.isAdmin) });
    }
    return true;
  } catch (err) {
    return false;
  }
}

async function createProject(user, projectName) {
  await setAuthHeader(user);
  try {
    const {
      data: { item },
    } = await fetch.post('/projects', projectName);
    const { id, name } = item;
    const projectInfo = {
      id,
      name,
    };
    testProjects.push(projectInfo);
  } catch (error) {
    return false;
  }
  return true;
}

async function deleteTestUsers() {
  await setAuthHeader();
  for (const user of testUsers) {
    try {
      await fetch.delete('/users/' + user.id);
    } catch (error) {}
  }
  testUsers.length = 0;
}

async function deleteTestProjects() {
  await setAuthHeader();
  for (const project of testProjects) {
    try {
      await fetch.delete('/projects/' + project.id);
    } catch (error) {}
  }
  testProjects.length = 0;
}

module.exports = {
  createProject,
  createUser,
  deleteTestUsers,
  deleteTestProjects,
};
