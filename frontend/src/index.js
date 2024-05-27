import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider, useSelector } from "react-redux";
import { persistor, store } from "./app/store";
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { BASE_URL } from "./utils";
import { PersistGate } from "redux-persist/integration/react";
import { Auth } from "./Components/Auth";
import ThemeProvider from "./Components/ThemeProvider";
import toast, { Toaster } from 'react-hot-toast';
import { PropsWithChildren } from "react";
import { setContext } from "@apollo/client/link/context";

// const [token,setToken]=useState("");



const httpLink = new HttpLink({
  uri: BASE_URL + "/graphql",
});


const MyApolloProvider = ({ children }) => {
  // let token = localStorage.getItem("token");
  let token=useSelector((state)=>state.user.token);
  // console.log("token at myApolloProvider",token);
  const userMiddleware = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token||localStorage.getItem("token")
    }
  }));
  const client = new ApolloClient({
    link: from([userMiddleware, httpLink]),
    cache: new InMemoryCache(),
  });

  MyApolloProvider.client=client;

  
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <MyApolloProvider >
        <ThemeProvider>
          <Auth>
            <App />
            <Toaster position="bottom-center" />
          </Auth>
        </ThemeProvider>
      </MyApolloProvider>
    </Provider>
  </PersistGate>
  // {/* </React.StrictMode> */}
);

export default MyApolloProvider;
reportWebVitals();
