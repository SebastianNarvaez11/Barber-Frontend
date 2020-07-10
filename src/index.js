import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from './store-manager/actions/ProductActions'
import axios from 'axios'
import { getConfig } from "./config";
import thunkMiddleware from 'redux-thunk';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
//TODO: Borrar cuando se conecte al backend
import reducers from './store-manager/reducers';
import { getUserInfoFromJWT } from './utils';

let config = getConfig()
let apiURL = config.apiURL

let current_token, current_user;
try {
  current_token = JSON.parse(localStorage.getItem('currentToken'));
  current_user = getUserInfoFromJWT(current_token)
} catch (error) {
  current_token = {}
  current_user = {}
}


const generalState = {
  current_user: current_user,
  is_logged: (current_user && current_user.token ? true : false),

  barber: {
    name: 'BarberShop',
    logo: `${config.staticURL}/media/logo.jpg`
  },

};


const createImage = store => next => action => {
  switch (action.type) {

    case CREATE_PRODUCT:
      let url = `${apiURL}/api/v1/product_photo/`
      const photos = action.payload.photos
      const photos_save = []

      photos.map(function (photo) {
        const formData = new FormData()
        formData.append('product', action.payload.product.id);
        formData.append('photo', photo)
        return axios.post(url, formData)
          .then(response => {
            photos_save.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      })
      action.payload.product.photos = photos_save
      return next(action);


    case UPDATE_PRODUCT:

      const extras = action.payload.extra
      const extras_save = action.payload.product.photos

      if (extras) {
        let url_ = `${apiURL}/api/v1/product_photo/`
        extras.map(function (photo) {
          const formData = new FormData()
          formData.append('product', action.payload.product.id);
          formData.append('photo', photo)
          return axios.post(url_, formData)
            .then(response => {
              extras_save.push(response.data)
            })
            .catch(error => {
              console.log(error)
            })
        })
        action.payload.product.photos = extras_save
        return next(action);
      }
      break

    default:
      next(action);
  }
}

const initialState = {
  general: generalState
}

export const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, createImage)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
  </Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
