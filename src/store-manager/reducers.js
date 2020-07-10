import { combineReducers } from 'redux';
import { SET_LOGIN } from './actions';
import userReducer from './reducers/UserReducer'
import productReducer from './reducers/ProductReducer'
import appointmentReducer from './reducers/AppointmentReducer'

import { getUserInfoFromJWT } from '../utils';

const ReducerGeneral = (state = {}, action) => {
  switch (action.type) {
    case SET_LOGIN:
      if (action.token) {
        try {
          let user = getUserInfoFromJWT(action.token);
          return { ...state, is_logged: true, current_user: user };
        } catch (error) {
          return { ...state, is_logged: false, current_user: {} };
        }
      } else {
        localStorage.removeItem('currentToken');
        return { ...state, is_logged: false, current_user: {} };
      }
    default:
      return state;
  }
};

const reducers = combineReducers({
  'general': ReducerGeneral,
  'userReducer': userReducer,
  'productReducer': productReducer,
  'appointmentReducer': appointmentReducer,
});

export default reducers;