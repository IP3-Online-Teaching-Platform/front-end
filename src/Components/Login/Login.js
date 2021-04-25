import firebase from "firebase/app";
import React, { useState } from "react";
import { auth } from '../Auth/Firebase-Auth';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch(error => {
      setError("Invalid email address or password!");
    });
  };

  const signInWithGoogleHandler = (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    auth.signInWithPopup(provider);
  }

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'email') {
      setEmail(value);
    }
    else if (name === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="login-container">
      <script src="https://apis.google.com/js/platform.js" async defer></script>
      <div className="main-login-container">
        <div className="google-facebook-container">
          <div className="google-facebook">
            <div className="google-facebook-button">
              <div className="image-container">
                <img src="/assets/googlelogo.png" className="google-button-image" alt='' />
              </div>
              <button type="submit" className="google-facebook-link" onClick={(event) => { signInWithGoogleHandler(event) }}>Log in with Google</button>
            </div>
          </div>
        </div>
        <form className="login-form" action="/dashboard">
          <p className="login-title">Welcome back!</p>

          <label className="form-label" htmlFor="email">Email</label>
          <input type="email" className="form-input" name="email" value={email} onChange={(event) => onChangeHandler(event)} />

          <label className="form-label" htmlFor="password">Password</label>
          <input type="password" className="form-input" name="password" value={password} onChange={(event) => onChangeHandler(event)} />

          <a className="login-form-text" href="/forgotpassword">Forgot your password?</a>
          {error !== null && (
            <div>{error}</div>
          )}
          <button type="submit" className="login-form-submit-button" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>Log in</button>
          <a className="login-form-text" href="/register">Don't have an account?</a>
        </form>
        <div className="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    </div>
  );
};
export default Login;