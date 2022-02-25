const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  console.log('creando token', user);
  const { nickname, roles, _id } = user;
  return jwt.sign({ nickname, roles, _id }, secret, { expiresIn });
};
const getUser = async (token, secret) => {
  try {
    const tokenBe = token.split(' ');
    // console.log('a');
    const tokenUser = await jwt.verify(tokenBe[1], secret);
    return tokenUser;
  } catch (e) {
    console.log(e);
  }
  // return jwt.verify(tokenBe[1], secret);
};
module.exports = {
  createToken,
  getUser,
};
