import React from 'react';
import './Main.css';
import Sidebar from '../Sidebar/Sidebar';
import Cliente from '../Cliente/Cliente';

function Main() {
  
  return (
    <main className="main">
      <Sidebar />
      <Cliente />
    </main>
  );
}

export default Main;
