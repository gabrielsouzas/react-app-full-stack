import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Provider from './context/Provider';

function App() {
  
  return (
    <Provider>
      <Header />
      <Main />
    </Provider>
  );
}

export default App;
