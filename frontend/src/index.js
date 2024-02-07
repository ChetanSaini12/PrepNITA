import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BASE_URL } from "./utils";


// client for graphql
const client = new ApolloClient({
  uri: BASE_URL + "/graphql",
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token") || "",
  },
});

console.log("CLIENT : ", client);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Provider>
      </PersistGate>
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
