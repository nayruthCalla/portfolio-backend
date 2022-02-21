const validateToken = require('./auth/auth.services');
const Usuario = require('./models/Usuario');
async function context({ req }) {
  let token = null;
  let currentUser = null;
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const payload = await validateToken(token);
      //Buscar usuario por email
      const usuario = await Usuario.findOne({ email: payload.email });
      currentUser = usuario;
    } catch (error) {
      throw new Error('No tienes autorización 9');
    }
  }
  return { currentUser };
}
module.exports = context;
