const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./config/database');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const pkg = require('./package.json');

const typeDefs = require('./api/schemas');
const resolvers = require('./api/resolvers');
const http = require('http');
const jwtAction = require('./api/auth');
const { ApolloError } = require('apollo-server-express');

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  app.get('/', (req, res) =>
    res.json({ name: pkg.name, version: pkg.version })
  );
  const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true, // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));
  const server = new ApolloServer({
    cors: false,
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      if (token !== '') {
        const user = jwtAction.getUser(token, process.env.SECRET);
        // console.log(user);
        if (!user) throw new ApolloError('you must be logged in');

        return { user };
      }
      return [];
    },
    introspection: true, // process.env.NODE_ENV !== 'production',
  });
  // await server.createHandler({
  //   cors: {
  //     origin: '*',
  //     credentials: true,
  //   },
  // });
  await server.start();
  connectDB();

  server.applyMiddleware({ app, path: '/', cors: false });
  await new Promise((resolve) =>
    httpServer.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}

startApolloServer()
  .then((r) => r)
  .catch((e) => console.log(e));
