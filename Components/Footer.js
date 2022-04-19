import React from "react";
import { AuthContext} from '../Contexts/AuthContext';
import { useContext, useEffect } from "react";
import axios from "axios";
import appConfig from "../config";

function Footer() {
  const {loggedInUser, setLoggedInUser} = useContext(AuthContext);

  

  
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