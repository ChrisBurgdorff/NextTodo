import React from "react";
import { AuthContext} from '../Contexts/AuthContext';
import { useContext, useEffect } from "react";
import axios from "axios";
import appConfig from "../config";

function Footer() {
  const {loggedInUser, setLoggedInUser} = useContext(AuthContext);

  useEffect(() => {
    // Perform localStorage action
    const accessToken = localStorage.getItem('x-access-token');
    axios.defaults.headers.common["x-access-token"] = accessToken;
    axios.get(appConfig.API_BASE_URL + '/api/currentuser')
      .then(response => {
        if (response.data) {
          const currentUser = response.data[0];
          setLoggedInUser(currentUser);
        } else {
          setLoggedInUser(appConfig.nullUser);
        }
    }).catch(err => {
        console.log(err);
        setLoggedInUser(appConfig.nullUser);
    });
  }, [])

  
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Here is my fucking app. I hope you fucking enjoy!
        </p>
      </div>
    </footer>  
  );
}

export default Footer;