const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  console.log(user);
  const { nickname } = user;
  return jwt.sign({ nickname }, secret, { expiresIn });
};
const getUser = (token, secret) => jwt.verify(token, secret);
module.exports = {
  createToken,
  getUser,
};
