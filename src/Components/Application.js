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

        <Route path="/dashboard">
          {user ? <Dashboard /> : <Redirect to="/" />}
        </Route>

        <Route path="/payment">
          <MakePayment />
        </Route>

      </Switch>
    </BrowserRouter>

  );
}

export default Application;