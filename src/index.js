require('dotenv/config');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const express = require('express');
const {
  ApolloServer,
  AuthenticationError,
} = require('apollo-server-express');
const schema = require('./schema');
const resolvers = require('./resolvers');

const app = express();

app.use(cors());

app.use(morgan('dev'));

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    return {
      ...error,
    };
  }
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 8000;

httpServer.listen({ port }, () => {
  console.log(`Apollo Server on http://localhost:${port}/graphql`);
});
