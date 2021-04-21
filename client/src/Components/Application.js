import React, { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import StudentSignUp from "./Login/StudentSignUp";
import TutorSignUp from "./Login/TutorSignUp";
import Dashboard from "./Dashboard/Dashboard";
import PasswordReset from "./Login/PasswordReset";
import Home from './Home/Home'
import { UserContext } from '../Providers/UserProvider'
import MakePayment from './Payment/MakePayment'

function Application() {

  const user = useContext(UserContext);

  return (
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
          {user ? <Redirect to="/dashboard" /> : <Home />}
        </Route>

        <Route path="/studentsignup">
          {user ? <Redirect to="/dashboard" /> : <StudentSignUp />}
        </Route>

        <Route path="/tutorsignup">
          {user ? <Redirect to="/dashboard" /> : <TutorSignUp />}
        </Route>

        <Route path="/passwordreset">
          {user ? <Redirect to="/dashboard" /> : <PasswordReset />}
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/dashboard" /> : <Login />}
        </Route>

        <Route path="/payment">
          <Redirect to="/payment" /> : <MakePayment />
        </Route>

        <Route path="/dashboard">
          {user ? <Dashboard /> : <Redirect to="/"/>}
        </Route>

      </Switch>
    </BrowserRouter>

  );
}

export default Application;