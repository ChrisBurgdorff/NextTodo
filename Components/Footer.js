import React from "react";
import { AuthContext} from '../Contexts/AuthContext';
import { useContext, useEffect } from "react";
import axios from "axios";
import appConfig from "../config";

function Footer() {
  const {loggedInUser, setLoggedInUser} = useContext(AuthContext);
  /*
  function testUser() {
    const myUser = {
      id: 1,
      email: "wes"
    }
    setLoggedInUser(myUser);
  }*/

  axios.get(appConfig.API_BASE_URL + '/api/currentuser')
    .then(response => {
      console.log("response coming from aou.getcurrentuser");
      console.log(response.data);
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