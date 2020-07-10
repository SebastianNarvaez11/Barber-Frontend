import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { store } from '../index';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const current_store = store.getState().general;
        const current_user = current_store.current_user;
        if (!current_store.is_logged) {
            // not logged in so redirect to login page with the return url
            return <Redirect to='/login' />
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(current_user.role) === -1) {
            // role not authorised so redirect to home page
            return <Redirect to='/' />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)