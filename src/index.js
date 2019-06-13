require('dotenv/config');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const express = require('express');
const {
  ApolloServer,
  AuthenticationError,
} = require('apollo-server-express');
const { createRateLimitDirective } = require('graphql-rate-limit');
const jwt = require('jsonwebtoken');
const schema = require('./schema');
const resolvers = require('./resolvers');
const { UserController } = require('./controllers');
const { AuthenticationDirective } = require('./customDirectives');
const rateLimitDirective = createRateLimitDirective({ identifyContext: (ctx) => ctx.id });

const app = express();

app.use(cors());

app.use(morgan('dev'));

const getUserFromToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_SECRET, async (err, tokenPayload) => {
    if (err) {
      return reject(err);
    }

    const user = await UserController.getUserById(tokenPayload.id);

    resolve(user);
  });
});

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  schemaDirectives: {
    rateLimit: rateLimitDirective,
    authentication: AuthenticationDirective,
  },
  context: async ({ req }) => {
    if (req.headers && req.headers['x-token']) {
      const token = req.headers['x-token'];
      // try {
      //   const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
        
      //   return { user: await UserController.getUserById(tokenPayload.id) }
      // } catch(err) {
      //   throw new AuthenticationError('Invalid Token')
      // }
      try {
        const user = await getUserFromToken(token);

        return { user };
      } catch(e) {
        throw new AuthenticationError('Invalid Token')
      }
      
    }
  },
  formatError: error => {
    return {
      message: error.message,
      code: error.extensions.code,
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
