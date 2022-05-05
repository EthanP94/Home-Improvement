import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Project from './pages/Project';
// import Employees from './pages/Employee';
// import Clients from './pages/Client';

import NavAppBar from './components/Navbar';
import LoginForm from './components/LoginPage';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <NavAppBar />
          <Routes>
          <Route 
              path="/" 
              element={<LoginForm/>} 
            />
            <Route 
              path="/" 
              element={<LoginForm/>} 
            />
            <Route 
              path="/projects" 
              element={<Project/>} 
            />
            {/* <Route 
              path="/project/:projectId" 
              element={<SingleProject/>} 
            />
            <Route 
              path="/employees" 
              element={<Employees/>} 
            />
             <Route 
              path="/employee/:employeeId" 
              element={<Employees/>} 
            />
            <Route 
              path="/clients" 
              element={<Clients/>} 
            />
            <Route 
              path='*' 
              element={<h1 className="display-2">Wrong page!</h1>}
            /> */}
          </Routes>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
