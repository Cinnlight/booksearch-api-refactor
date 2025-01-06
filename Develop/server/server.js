// server.js

require('dotenv').config();
const express = require('express');
const path = require('path');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const db = require('./config/connection');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { verifyToken } = require('./utils/auth');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;
console.log('PORT:', PORT);
const app = express();

// Middleware for parsing incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production'
      ? 'https://your-production-domain.com' // Replace with your production domain
      : 'http://localhost:3000', // Frontend development server
  credentials: true,
};
app.use(cors(corsOptions));

// Serve static files from the React frontend app only in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server and apply middleware
async function startApolloServer() {
  await server.start();

  // Apply Apollo middleware before defining wildcard routes
  app.use(
    '/graphql',
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || '';
        const token = authHeader.split(' ').pop().trim();
        const user = verifyToken(token);
        return { user };
      },
    })
  );

  // Define a wildcard route to serve the React app for any unknown routes (client-side routing) only in production
  if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
  } else {
    // In development, respond with a simple message for all other routes
    app.get('*', (req, res) => {
      res.send('GraphQL server is running. Use Apollo Sandbox at /graphql');
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
      if (process.env.NODE_ENV !== 'production') {
        console.log(`🚀 Sandbox available at http://localhost:${PORT}/graphql`);
      }
    });
  });
}

startApolloServer();
