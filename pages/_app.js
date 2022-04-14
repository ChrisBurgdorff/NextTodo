import '../styles/globals.css';
import '../styles/bulma/bulma.css';
import '../styles/fontawesome/css/all.min.css'
import Navigation from '../Components/Navigation';
import Footer from '../Components/Footer';
import axios from 'axios';
import config from '../config';
var jwt = require('jsonwebtoken');
import React from 'react';
import {createContext, useContext} from 'react';
import { AuthProvider } from '../Contexts/AuthContext';
import { CookiesProvider } from 'react-cookie';


function MyApp({ Component, pageProps }) {

  const nullUser = {
    id: 0,
    email: ""
  };

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

