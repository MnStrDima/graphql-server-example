const { ApolloServer } = require("apollo-server-express");

// const db = require("./model/db");
const PORT = process.env.PORT || 3000;

const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const server = async () => {
  const app = express();
  const formatsLogger = app.get("env") === "development" ? "dev" : "short";
  app.use(logger(formatsLogger));
  app.use(cors());
  app.use(express.json());
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.start();

  server.applyMiddleware({ app });
  app.use((req, res) => {
    res.status(200);
    res.send("Hello!");
    res.end();
  });

  app.use((req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({
      status: status === 500 ? "Fail" : "Error",
      code: status,
      message: err.message,
    });
  });

  try {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Server not running. Error message: ${error.message}`);
  }
};

module.exports = server;
