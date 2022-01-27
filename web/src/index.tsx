import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './index.css';
import { Routes } from './Routes';

// Pass your GraphQL endpoint to uri
const client = new ApolloClient({
   //uri: process.env.AWS_URL!,
   uri: "http://localhost:4000/graphql",
   credentials: 'include'
  });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
      
  </ApolloProvider>,
  document.getElementById('root') as HTMLElement);
