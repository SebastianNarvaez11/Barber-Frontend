export const SET_LOGIN = 'SET_LOGIN';
export const ADD_USER = 'ADD_USER';
export const ADD_SERVICE = 'ADD_SERVICE';
export const UPDATE_USER = 'UPDATE_USER';

export const setLogin = (token) => {
  return {
    type: SET_LOGIN,
    token
  }
}

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user
  }
}

export const addService = (service) => {
  return {
    type: ADD_SERVICE,
    service
  }
}

export const updateUser = (user) => {
  return {
    type: UPDATE_USER,
    payload: {
      user: user
    }
  }
}
