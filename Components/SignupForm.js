import axios from "axios";
import React, { useState } from "react";
import config from "../config";

function SignupForm() {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

function signup(e) {
  e.preventDefault();
  axios.post(config.API_BASE_URL + '/api/auth/register', {
    email: email,
    password: password
  }).then((response) => {
    console.log(response.data);
  }).catch((err) => {

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
            <input className="input is-rounded" type="text" placeholder="Enter valid email" />
            <span class="icon is-small is-left">
              <i class="fas fa-envelope"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="field">
          <label className="label">Password</label>
          <div className="control has-icons-left">
            <input className="input is-rounded" type="password" placeholder="Must be 8 characters" />
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
          <button className="button is-primary">Submit</button>
        </div>
      </div>
    </article>
  );
}

export default SignupForm;