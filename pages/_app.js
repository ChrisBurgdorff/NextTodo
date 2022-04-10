import '../styles/globals.css';
import '../styles/bulma/bulma.css';
import '../styles/fontawesome/css/all.min.css'
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import axios from 'axios';
import config from '../config';
var jwt = require('jsonwebtoken');
import React from 'react';
import { useCookies } from 'react-cookie';
import {createContext, useContext} from 'react';



function MyApp({ Component, pageProps }) {

  const nullUser = {
    id: 0,
    email: ""
  };

  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);
  const UserContext = createContext();
  

  try {
    const jwtToken = cookies.TodoJWT;
    const decodedToken = jwtToken.verify(token, config.JWT_SECRET);  
    var userId = decodedToken.id;
    console.log("USER ID COMING FROM FUCKING CONTEXT");
    console.log(userId); //Verify getting ID
  } catch(err) {
    console.log(err);
  }

  return(
    <>
      <UserContext.Provider value={nullUser} >
        <Navigation />
        <Component {...pageProps} />
        <Footer />
        <style jsx global>{`
          #__next {
            flex-direction: column;
            min-height: 100vh;
            display: flex;
          }
        `}</style>
      </UserContext.Provider>
    </>
  );
}

export default MyApp;

