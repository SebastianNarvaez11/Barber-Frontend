import React from 'react'
import '../static/css/Style.css'
import 'react-toastify/dist/ReactToastify.css';
import Homepage from "./Homepage";
import Login from "./Login";
import Admin from "./admin";
import MyAppointments from './MyAppointments';
import { initAxiosInterceptors } from '../store-manager/helper'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { PrivateRoute } from './PrivateRoute';

initAxiosInterceptors()

export default function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/admin" roles={['ADMIN', 'Admin']} component={Admin} />
        <PrivateRoute path="/appointments" component={MyAppointments} />
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}
