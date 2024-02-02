import React from 'react';
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
;
import './index.css';
import 'react-toastify/dist/ReactToastify.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const url = "http://localhost:5000"
// process.env.REACT_APP_API_ENDPOINT ||

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    },
  },
})

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
        <App />
      <ToastContainer />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
