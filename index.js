const express = require('express');
const connectDB = require('./config/database');
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
// const { typeDefs, resolvers } = require("./schema");
const typeDefs = require('./api/schemas');
const resolvers = require('./api/resolvers');
const http = require('http');

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  connectDB();
  // Mount Apollo middleware here.
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  // const a = await connectDB();
  // console.log(a)
  return { server, app };
}

startApolloServer()
  .then((r) => r)
  .catch((e) => console.log(e));
