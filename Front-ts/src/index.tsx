import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import GlobalStyle from "./GlobalStyle";

import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";

import client from "./apolloClient";
import { GlobalProvider } from "./GlobalState/Store";

ReactDOM.render(
  <GlobalProvider>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App />
        <GlobalStyle />
      </ApolloHooksProvider>
    </ApolloProvider>
  </GlobalProvider>,
  document.getElementById("root")
);
