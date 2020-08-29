import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import allreducer from "./redux/reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import { ApolloClient, InMemoryCache,ApolloProvider} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client'

import App from './App';
import Register from './components/auth/Register';
const httpLink = createUploadLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  //console.log(token)
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
const middleware = [thunk];
const store=createStore(allreducer,composeWithDevTools(
  applyMiddleware(...middleware),
  // other store enhancers if any
));

ReactDOM.render(
  <ApolloProvider client={client}>
  <Provider store={store}>
    <App />
  </Provider>
  </ApolloProvider> ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

