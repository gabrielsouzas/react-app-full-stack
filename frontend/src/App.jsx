import React from 'react';
import './App.css';
//import Header from './components/Header/Header';
//import Main from './components/Main/Main';
import Provider from './context/Provider';
import Login from './pages/Login/Login';

/*<Header />
      <Main /> */

function App() {
  
  return (
    <Provider>
      <Login />
    </Provider>
  );
}

export default App;
