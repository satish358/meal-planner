require("dotenv").config();
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// Function to start Apollo Server and Express app
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  // Connecting to the database
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  db.once("open", () => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.error(`Client runnig at http://localhost:${PORT}`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
