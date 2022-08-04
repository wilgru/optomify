// Styles
import 'antd/dist/antd.css'
import './App.less';

// Ant Design
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

// react and react router
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// Pages
import Bookings from './pages/Bookings';
import Patients from './pages/Patients';
import Patient from './pages/Patient';
import PleaseLogIn from './pages/PleaseLogIn';

// Apollo imports
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import auth from './utils/auth';

// Construct the main GraphQL API endpoint to /graphql 
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

// Setting up Apollo Client
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Antd Layout components
const { Footer } = Layout;

// App
const App = () => {
  const [loggedIn, setLoggedIn] = useState(auth.loggedIn())

  const [page, setPage] = useState(
    // window.location.pathname.split('/')[1]
    'bookings'
  )
  console.log(page)

  return (
    <ApolloProvider client={client}>
      <Router>
        <Layout>
          <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} page={page} setPage={setPage}/>
          <Routes>
            {loggedIn ? (
              <>
                <Route path='/bookings' element={<Bookings setLoggedIn={setLoggedIn} loggedIn={loggedIn} setPage={setPage}/>}/>
                <Route path='/patients' element={<Patients setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}/>
                <Route path='/patients/:id' element={<Patient setLoggedIn={setLoggedIn} loggedIn={loggedIn}/>}/>
                <Route path='*' element={ <Navigate to="/bookings" /> }/>
              </>
            ) : (
              <Route path='*' element={<PleaseLogIn />}/>
            )}
          </Routes>
          <Footer style={{textAlign: 'center'}}>
            Optomify ©2022 Created by William Gruszka
          </Footer>
        </Layout>
      </Router>
    </ApolloProvider>
  )
};

export default App;
