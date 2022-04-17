import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useCookies } from 'react-cookie';
import axios from "axios";
import appConfig from '../config';

function Navigation() {

  //Get logged in user
  const {loggedInUser, setLoggedInUser} = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(["TodoJWT"]);


  async function logout(e) {
    removeCookie();
    localStorage.removeItem('x-access-token');
    const response = await axios.post(appConfig.BASE_URL + '/api/logout');
    if (response.status === 200) {
      //alert(response.data.message);
    }
    window.location.href = '/login';
  }

  return(
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="/images/TMLogo.png" width="112" height="28" />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <a className="navbar-item" href="/t">
            {(loggedInUser) && loggedInUser.email}
          </a>
          <a className="navbar-item" href="/">
            Home
          </a>

          <a className="navbar-item" href="/about">
            About 
          </a>
        </div>
        <a className="navbar-item"></a>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {(!loggedInUser || loggedInUser.id == 0) &&         
              <a className="button is-primary" href="/signup">
                <strong>Sign up</strong>
              </a>}
              {(!loggedInUser || loggedInUser.id == 0) &&
               <a className="button is-light" href="/login">
                Log in
              </a>}
              {(loggedInUser && loggedInUser.id > 0) &&
              <a className="button is-light" onClick={logout}>
                <strong>Log Out</strong>
              </a>}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;