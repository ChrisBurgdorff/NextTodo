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
import { AuthProvider } from '../Contexts/AuthContext';
import { CookiesProvider } from 'react-cookie';



function MyApp({ Component, pageProps }) {

  const nullUser = {
    id: 0,
    email: ""
  };

  const [cookies, setCookie, removeCookie] = useCookies();  

  try {
    console.log("IN TRY");
    //const x = cookies.get('TodoJWT');
    //console.log(x);
    if (cookies.TodoJWT) {
      const jwtToken = cookies.TodoJWT;
      const decodedToken = jwtToken.verify(token, config.JWT_SECRET);  
      var userId = decodedToken.id;
      console.log("USER ID COMING FROM FUCKING CONTEXT");
      console.log(userId); //Verify getting ID
    } else {
      console.log(cookies);
      console.log("IN ELSE");
    }
  } catch(err) {
    console.log(err);
  }

  return(
    <>
      <CookiesProvider>
        <AuthProvider>
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
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}

export default MyApp;

