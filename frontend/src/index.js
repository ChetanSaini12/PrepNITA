import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './app/store';



import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const BaseUrl = "http://localhost:7000";

// client for graphql
const client = new ApolloClient({
  uri: BaseUrl,
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('token') || '',
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>
);


reportWebVitals();


