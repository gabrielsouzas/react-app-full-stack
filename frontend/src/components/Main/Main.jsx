import React, { useContext } from 'react';
import './Main.css';
import Sidebar from '../Sidebar/Sidebar';
import Cliente from '../Cliente/Cliente';
import Fornecedor from '../Fornecedor/Fornecedor';
import AppContext from '../../context/AppContext';

function Main() {

  const { entitySelected } = useContext(AppContext);

  const renderEntity = () => {
    if (entitySelected === 'cliente'){
      return <Cliente />;
    } else if (entitySelected === 'fornecedor'){
      return <Fornecedor />;
    }

    return null;
  };
  
  return (
    <main className="main">
      <Sidebar />
      {renderEntity()}
    </main>
  );
}

export default Main;
