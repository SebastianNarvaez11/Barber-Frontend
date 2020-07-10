import React, { Component } from 'react';
import Header from '../Header';
import {
  Switch,
  Route,
} from "react-router-dom";

import Users from './Users';
import Services from './Services';
import Appointments from './Appointments';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard'

export class index extends Component {
  render() {
    const { match } = this.props;
    return (

      <div>
        <div className="d-flex" id="wrapper">
          <Sidebar />
          <div id="page-content-wrapper">
            <Header />
            <Switch>
              <Route path={`${match.path}/users`}>
                <Users />
              </Route>
              <Route path={`${match.path}/services`}>
                <Services />
              </Route>
              <Route path={`${match.path}/appointments`}>
                <Appointments />
              </Route>
              <Route path={match.path}>
                <Dashboard />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}


export default index;