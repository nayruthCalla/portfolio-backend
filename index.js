const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/database');
const cors = require('cors');
const typeDefs = require('./api/schemas');
const resolvers = require('./api/resolvers');
const jwtAction = require('./api/auth');
const { ApolloError } = require('apollo-server-express');
const { createPaymentIntent } = require('./api/payment');

async function startServer() {
  const app = express();
  app.get('/', (req, res) => res.json({ name: 'Portfolio' }));
  app.post('/create-checkout-session', createPaymentIntent);

  connectDB();

  console.log('Connected to MongoDB');
  app.use(cors());
  const apolloServer = new ApolloServer({
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

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  // app.use((req, res) => {
  //   res.send('Hello world!');
  // });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
}

setImmediate(startServer);
