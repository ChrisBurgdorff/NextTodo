import { useState, useEffect } from "react";
import axios from "axios";
import config from '../config';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';

function LoginForm() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookie, setCookie] = useCookies(['TodoJWT']);

  const router = useRouter();

  function login(e) {
    e.preventDefault();
    axios.post(config.API_BASE_URL + '/api/auth/login', {
      email: email,
      password: password
    }).then((response) => {
      if (response.data.accessToken) {
        //Login successful
        if (response.status === 200) {
          setCookie('TodoJWT', response.data.accessToken);
          router.push("/");
        } else {
          //Login unsucessfule
        }
      } else {
        //Login unsuccessful
      }
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
            <input className="input is-rounded" type="password" placeholder="Must be 8 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <button className="button is-primary" onClick={login}>Submit</button>
        </div>
      </div>
    </article>
  );
}

export default LoginForm;