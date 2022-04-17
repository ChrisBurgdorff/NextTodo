import axios from "axios";
import React, { useState } from "react";
import config from "../config";
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

function SignupForm() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [statusMessage, setStatusMessage] = useState("");
const [hasError, setHasError] = useState(false);
const [cookie, setCookie] = useCookies(['TodoJWT']);

const router = useRouter();

function signup(e) {
  e.preventDefault();
  axios.post(config.API_BASE_URL + '/api/auth/register', {
    email: email,
    password: password
  }).then((response) => {
    console.log(response.data);
    if (response.status === 200) {
      //User was created successfully
      axios.post(config.API_BASE_URL + '/api/auth/login', {
        email: email,
        password: password
      }).then((response) => {
        if (response.data.accessToken) {
          console.log("about to set cookie");
          setCookie('TodoJWT', response.data.accessToken, {
            maxAge: 86400
          });
          localStorage.setItem('x-access-token', response.data.accessToken);
          axios.defaults.headers.common["x-access-token"] = response.data.accessToken;
          router.push("/t");
        } else {
          setHasError(true);
          setStatusMessage("Could Not Log In");
        }
      });
    } else {
      //User not created successfully
      setHasError(true);
      setStatusMessage(response.data.message || "User Not Created");
    }
  }).catch((err) => {
    //User not created successfully
    setHasError(true);
    setStatusMessage(err.message || "User Not Created");
  });
}

  return (
    <article className="panel is-info">
      <p className="panel-heading">
        Sign Up!
      </p>    
      <div className="panel-block">
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input className="input is-rounded" type="text" placeholder="Enter valid email" onChange={(e) => {setEmail(e.target.value);}} />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input className="input is-rounded" type="password" placeholder="Must be 8 characters" onChange={(e) => {setPassword(e.target.value);}} />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="field">
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" />
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <button className="button is-primary" onClick={signup}>Submit</button>
        </div>
      </div>
      <div className="panel-block">
        {hasError && <span className="has-text-danger"><strong>{statusMessage}</strong></span>}
      </div>
    </article>
  );
}

export default SignupForm;