import express from "express";
import http from "http";
import { CreateApolloServer, MyContext } from "./apollo-server";
import { ApolloServer } from "@apollo/server";
import path from "path";
import fs from "fs";

import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  HttpLink
} from '@apollo/client';
import fetch from 'cross-fetch';

import ReactDOMServer from "react-dom/server";
import App from "../client/App";
import React from "react";

(async function init() {
  console.log("Intializing server!");

  const app = express();
  const httpServer = http.createServer(app);
  const PORT = 4000;
  const client = new ApolloClient({
    ssrMode: true,
    link: new HttpLink({
      uri:'http://localhost:4000/gql',
      credentials: 'same-origin',
      fetch
    }),
    cache: new InMemoryCache()
  });

  app.use(express.static(path.resolve(__dirname, "public")));

  app.get("/", (req, res) => {
    fs.readFile(path.resolve(__dirname,"..","index.html"),"utf8", (err, data) => {
      if(err){
        console.log(err);
        return res.status(500).send("Error occured!!");
      }
      return res.send(
        data.replace(
          '<div id="root"></div>',
          `<div id="root">${ReactDOMServer.renderToString(
            <ApolloProvider client={client}><App/></ApolloProvider>
          )}</div>`
        )
      );
    })
  });

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
