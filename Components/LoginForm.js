import { useState, useEffect } from "react";
import axios from "axios";
import config from '../config';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(['TodoJWT']);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasError, setHasError] = useState(false);

  const router = useRouter();

  function login(e) {
    setHasError(false);
    e.preventDefault();
    axios.post(config.API_BASE_URL + '/api/auth/login', {
      email: email,
      password: password
    }).then((response) => {
      if (response.data.accessToken) {
        //Login successful
        if (response.status === 200) {
          setCookie('TodoJWT', response.data.accessToken);
          router.push("/t");
        } else {
          //Login unsuccessful
          setHasError(true);
          setStatusMessage("Wrong Username or Password, Bitch");
        }
      } else {
        //Login unsuccessful
        setHasError(true);
        setStatusMessage("Wrong Username or Password, Bitch");
      }
    }).catch((err) =>{
      setHasError(true);
      setStatusMessage(err.message);
    });
  }

  return (
    <article className="panel is-info">
      <p className="panel-heading">
        Login
      </p>    
      <div className="panel-block">
        <div className="field">
          <label className="label">Email</label>
          <div className="control has-icons-left">
            <input className="input is-rounded" type="text" placeholder="Enter valid email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
            <input className="input is-rounded" type="password" placeholder="Must be 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <button className="button is-primary" onClick={login}>Submit</button>
        </div>
      </div>
      <div className="panel-block">
        {hasError && <p className="has-text-danger"><strong>{statusMessage} Wrong Email or Password Bitch!</strong></p>}
      </div>      
    </article>
  );
}

export default LoginForm;

