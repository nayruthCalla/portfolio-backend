const { ApolloServer, ApolloError } = require('apollo-server');
const typeDefs = require('./api/schemas');
const resolvers = require('./api/resolvers');
const conectarDB = require('./config/database');
const jwtAction = require('./api/auth');
//Servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    // console.log(token);

    if (token !== '') {
      console.log(token, '15');
      const user = await jwtAction.getUser(token, process.env.SECRET);
      console.log(user, 'user');
      if (!user) throw new ApolloError('you must be logged in');

      return { user };
    }
    return [];
  },
});
// Conectar a la DB
conectarDB();
// Iniciar el server
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log('Servidor listo en la url: ' + url);
});
