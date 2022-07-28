// Styles
import 'antd/dist/antd.css'
import './App.less';

// Ant Design
// import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';

// react router
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// components
import Navbar from './components/Navbar';

// Pages
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';

// Apollo imports
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
const App = () => (
  <ApolloProvider client={client}>
     <Router>
      <Layout style={{height: '100vh'}}>
        <Navbar />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route path='/bookings' element={<Bookings />}/>
        </Routes>
        <Footer style={{textAlign: 'center'}}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
     </Router>
  </ApolloProvider>
);

export default App;



// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <Router>
//         <>
//           <Navbar />
//           <Routes>
//             <Route 
//               path='/dashboard'
//               element={<Dashboard />}
//             />
//             <Route 
//               path='/bookings'
//               element={<Bookings />}
//             />
//             <Route 
//               path='*'
//               element={<h1 className='display-2'>Wrong page!</h1>}
//             />
//           </Routes>
//         </>
//       </Router>
//     </ApolloProvider>
//   );
// }

// export default App;
