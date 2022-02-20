const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  console.log('creando token', user);
  const { nickname, roles, _id } = user;
  return jwt.sign({ nickname, roles, _id }, secret, { expiresIn });
};
const getUser = (token, secret) => jwt.verify(token, secret);
module.exports = {
  createToken,
  getUser,
};
