import React from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/gql',
    cache: new InMemoryCache(),
})

import App from "./App";

const container = document.getElementById('root');

if(!container) throw new Error("Could not found root element in the html");

const root = createRoot(container); 

root.render(<ApolloProvider client={client}><App/></ApolloProvider>);