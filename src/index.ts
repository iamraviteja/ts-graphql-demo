import express from "express";
import http from "http";
import { CreateApolloServer, MyContext } from "./apollo-server";
import { ApolloServer } from "@apollo/server";

(async function init() {
  console.log("Intializing server!");
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = 4000;
  app.get("/status", (req, res) => {
    res.send("all ok in serverland!!");
  });
  const apolloServer: ApolloServer<MyContext> = await CreateApolloServer(
    app,
    httpServer,
    PORT
  );
  console.log(`http://localhost:${PORT}/gql`);
})();
