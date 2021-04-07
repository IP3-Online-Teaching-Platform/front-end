import React, { useState } from "react";
import { auth } from '../Firebase'

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
    <div class="login-container">
      <div class="main-login-container">
        <div class="google-facebook-container">
          <div class="google-facebook">
            <div class="google-facebook-button">
              <div class="image-container">
                <img src="/assets/googlelogo.png" class="google-button-image" alt='' />
              </div>
              <a href="/googlelogin" class="google-facebook-link">
                Log in with Google
                            </a>
            </div>
            <div class="google-facebook-button">
              <div class="image-container">
                <img src="/assets/facebooklogo.jpg" class="google-button-image" alt='' />
              </div>
              <a href="/facebooklogin" class="google-facebook-link">
                Log in with Facebook
                            </a>
            </div>
          </div>
        </div>
        <form class="login-form" action="/dashboard">
          <p class="login-title">Welcome back!</p>

          <label class="form-label" for="email">Email</label>
          <input type="email" class="form-input" name="email" value={email} onChange={(event) => onChangeHandler(event)} />

          <label class="form-label" for="password">Password</label>
          <input type="password" class="form-input" name="password" value={password} onChange={(event) => onChangeHandler(event)} />

          <a class="login-form-text" href="/forgotpassword">Forgot your password?</a>
          {error !== null && (
            <div>{error}</div>
          )}
          <button type="submit" class="login-form-submit-button" onClick={(event) => { signInWithEmailAndPasswordHandler(event, email, password) }}>Log in</button>
          <a class="login-form-text" href="/register">Don't have an account?</a>
        </form>
      </div>
    </div>
  );
};
export default Login;