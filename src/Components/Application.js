import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import ProfilePage from "./Login/ProfilePage";
import PasswordReset from "./Login/PasswordReset";
import Home from './Home/Home'
import { UserContext } from '../Providers/UserProvider'
import '../App/App.css'

function Application() {

  const user = useContext(UserContext);

  return (
    user ?
      <ProfilePage />
      :
      <BrowserRouter>
        <nav>
          <ul>
            <li className='signup'><Link to='/signup' className='signup'>Sign Up</Link></li>
            <li><Link to='/login'>Log In</Link></li>
            <li><Link to='/'>Contact Us</Link></li>
            <li><Link to='/'>About Us</Link></li>
            <li className='nav-li-float-left'><Link to='/'>E-Learner</Link></li>
          </ul>
        </nav>
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/signup">
            <SignUp />
          </Route>

          <Route path="/passwordreset">
            <PasswordReset />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

        </Switch>
      </BrowserRouter>

  );
}

export default Application;