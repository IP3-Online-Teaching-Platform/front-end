import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Login/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import PasswordReset from "./Login/PasswordReset";
import Home from './Home/Home'
import { UserContext } from '../Providers/UserProvider'

function Application() {

  const user = useContext(UserContext);
  return (
    user ?
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/chat">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
      :
      <BrowserRouter>

        {/*<nav>
          <ul>
            <li className='signup'><Link to='/signup' className='signup'>Sign Up</Link></li>
            <li><Link to='/login'>Log In</Link></li>
            <li><Link to='/'>Contact Us</Link></li>
            <li><Link to='/'>About Us</Link></li>
            <li className='nav-li-float-left'><Link to='/'>E-Learner</Link></li>
          </ul>
        </nav>*/}
        <Switch>

          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/register">
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