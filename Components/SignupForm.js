import axios from "axios";
import React, { useState } from "react";
import config from "../config";
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

function SignupForm() {

const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [statusMessage, setStatusMessage] = useState("");
const [hasError, setHasError] = useState(false);
const [cookie, setCookie] = useCookies(['TodoJWT']);
const [emailValid, setEmailValid] = useState(false);
const [passwordValid, setPasswordValid] = useState(false);
const [nameValid, setNameValid] = useState(false);
const [termsValid, setTermsValid] = useState(false);
const [formValid, setFormValid] = useState(false);
const [formValidationMessage, setFormValidationMessage] = useState(
  `Please enter a Name.
  Please enter a valid Email.
  Please enter a valid Password.
  Please accept the Terms and Conditions.
  `
);

const router = useRouter();

function validateEmail(email) {
  const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return res.test(String(email).toLowerCase());
}

function emailChange(emailInput) {
  setEmail(emailInput);
  setEmailValid(validateEmail(emailInput));
  setFormValid(validateEmail(emailInput) && passwordValid && termsValid && nameValid);
}
function nameChange(nameInput) {
  setName(nameInput);
  setNameValid((nameInput.length > 0));
  setFormValid(emailValid && passwordValid && termsValid && (nameInput.length > 0));
}
function passwordChange(passwordInput) {
  setPassword(passwordInput);
  setPasswordValid(passwordInput.length >= 8);
  setFormValid(emailValid && (passwordInput.length >= 8) && termsValid && nameValid);
}
function termsChange(termsInput) {
  setTermsValid(!termsValid);
  setFormValid((emailValid && passwordValid && !termsValid && nameValid));
}


function signup(e) {
  e.preventDefault();
  axios.post(config.API_BASE_URL + '/api/auth/register', {
    email: email,
    name: name,
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
          <label className="label">Name:</label>
          <div className="control has-icons-left">
            <input className="input is-rounded" type="text" placeholder="First Name" onChange={(e) => {nameChange(e.target.value);}} />
            <span className="icon is-small is-left">
              <i className="fas fa-user"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input className="input is-rounded" type="text" placeholder="Valid Email" onChange={(e) => {emailChange(e.target.value);}} />
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
            <input className="input is-rounded" type="password" placeholder="Must be 8 characters" onChange={(e) => {passwordChange(e.target.value);}} />
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
              <input type="checkbox" onChange={(e) => {termsChange(e.target.value);}} />
              I agree to the <a href="#">terms and conditions</a>
            </label>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <span className="tooltip"><button className="button is-primary" disabled={!formValid} onClick={signup}>Submit</button><span className="tooltiptext">{formValidationMessage}</span></span>
        </div>
      </div>
      <div className="panel-block">
        {hasError && <span className="has-text-danger"><strong>{statusMessage}</strong></span>}
        {nameValid && <span className="has-text-danger">Name is valid</span>}
        {passwordValid && <span className="has-text-danger">Password is valid</span>}
        {emailValid && <span className="has-text-danger">Email is valid</span>}
        {termsValid && <span className="has-text-danger">Terms is valid</span>}
        {!formValid && <span className="has-text-danger"><strong>Form is not yet valid.</strong></span>}
      </div>
    </article>
  );
}

export default SignupForm;