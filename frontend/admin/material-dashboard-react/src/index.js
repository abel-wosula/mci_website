import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Apollo
import { ApolloProvider } from "@apollo/client/react";
import client from "services/apollo";

// Contexts
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "context/AuthContext";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <BrowserRouter>
        <MaterialUIControllerProvider>
          <App />
        </MaterialUIControllerProvider>
      </BrowserRouter>
    </AuthProvider>
  </ApolloProvider>
);
