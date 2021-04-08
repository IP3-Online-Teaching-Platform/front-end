import firebase from "firebase/app";
import React, { useState } from "react";
import { auth } from '../Auth/Firebase'

const SignUp = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try {
      await auth.createUserWithEmailAndPassword(email, password);
    }
    catch (error) {
      console.log(error)
      setError('Error Signing up with email and password');
    }

    setEmail("");
    setPassword("");
    setFirstname("");
    setLastname("");
  };

  const createUserWithGoogleHandler = (event) => {
    event.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.signInWithPopup(provider);
  }

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "fname") {
      setFirstname(value);
    } else if (name === "lname") {
      setLastname(value);
    };
  };

  return (
    <div class="register-container">
      <div class="main-login-container">
        <div class="google-facebook-container">
          <div class="google-facebook">
            <div class="google-facebook-button">
              <div class="image-container">
                <img src="/assets/googlelogo.png" class="google-button-image" alt='' />
              </div>
              <button type="submit" class="google-facebook-link" onClick={(event) => { createUserWithGoogleHandler(event) }}>Sign up with Google</button>
            </div>
            <div class="google-facebook-button">
              <div class="image-container">
                <img src="/assets/facebooklogo.jpg" class="google-button-image" alt='' />
              </div>
              <a href="/facebookregister" class="google-facebook-link">
                Sign up with Facebook
                    </a>
            </div>
          </div>
        </div>


        <form class="login-form" action="/dashboard">
          <p class="login-title">Start learning!</p>

          <label class="form-label" for="fname">First name</label>
          <input type="text" class="form-input" name="fname" value={firstname} onChange={(event) => onChangeHandler(event)} />

          <label class="form-label" for="lname">Last name</label>
          <input type="text" class="form-input" name="lname" value={lastname} onChange={(event) => onChangeHandler(event)} />

          <label class="form-label" for="email">Email</label>
          <input type="email" class="form-input" name="email" value={email} onChange={(event) => onChangeHandler(event)} />

          <label class="form-label" for="password">Password</label>
          <input type="password" class="form-input" name="password" value={password} onChange={(event) => onChangeHandler(event)} />

          {error !== null && (
            <div>
              {error}
            </div>
          )}

          <button type="submit" class="login-form-submit-button" onClick={event => {
            createUserWithEmailAndPasswordHandler(event, email, password);
          }}>Create account</button>

          <a class="login-form-text" href="/login">Already have an account?</a>
        </form>

      </div>
    </div>
  );
};
export default SignUp;