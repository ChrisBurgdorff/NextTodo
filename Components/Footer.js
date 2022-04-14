import React from "react";
import { AuthContext} from '../Contexts/AuthContext';
import { useContext } from "react";

function Footer() {
  const {loggedInUser, setLoggedInUser} = useContext(AuthContext);
  
  function testUser() {
    const myUser = {
      id: 1,
      email: "wes"
    }
    setLoggedInUser(myUser);
  }
  
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          Here is my fucking app. I hope you fucking enjoy!
        </p>
        <button onClick={testUser}>Set User</button>
      </div>
    </footer>  
  );
}

export default Footer;