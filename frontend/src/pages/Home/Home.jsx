import React, { useContext } from 'react';

import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import AppContext from '../../context/AppContext';
import { isTokenExpired } from '../../utils/auth';

function Home() {

  const { authToken } = useContext(AppContext);

  /*
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  */

  const handleNotAuthenticated = () => {
    console.log(authToken);
  };

  const validateToken = () => {
    if (authToken) {
      if(isTokenExpired(authToken)) {
        return false;
      }
    } else {
      return false;
    }
    return true;
  };

  return (
    <>
      {(validateToken && 
        <>
          <Header />
          <Main />
        </>) || handleNotAuthenticated()
      }
    </>
  );
}

export default Home;

