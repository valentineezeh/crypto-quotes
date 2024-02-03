import React from 'react';
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
;
import './index.css';
import 'react-toastify/dist/ReactToastify.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {  ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { GoogleOAuthProvider } from '@react-oauth/google'
import { setContext } from '@apollo/client/link/context';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const httpLink = createHttpLink({ uri: "http://localhost:5000" })
// process.env.REACT_APP_API_ENDPOINT ||

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('accessToken');
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
      <GoogleOAuthProvider clientId='275342734926-ecck0q00r55ala4o522f248t42dpp4mq.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
      <ToastContainer />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
