import axios from 'axios'
import { getConfig } from '../../config'
import { toast } from 'react-toastify';
export const TOGGLE_MODAL = 'TOGGLE_MODAL'
export const ADD_PRODUCT = 'ADD_PRODUCT'
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
export const CREATE_APPOINTMENT = 'CREATE_APPOINTMENT'
export const CLEAR_PRODUCTS = 'CLEAR_PRODUCTS'

export const FETCH_MY_APPOINTMENTS = 'FETCH_MY_APPOINTMENTS'
export const FETCH_APPOINTMENTS = 'FETCH_APPOINTMENTS'
export const START_APPOINTMENT = 'START_APPOINTMENT'
export const UPDATE_APPOINTMENT = 'UPDATE_APPOINTMENT'

let config = getConfig()
let apiURL = config.apiURL


export const toogleModal = (show, product) => {
  return {
    type: TOGGLE_MODAL,
    product,
    show
  }
}

export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product,
  }
}

export const removeProduct = (product) => {
  return {
    type: REMOVE_PRODUCT,
    product,
  }
}

export const clearProducts = () => {
  return {
    type: CLEAR_PRODUCTS,
  }
}


export const createAppointment = (formData, callback) => async (dispatch) => {
  let url = `${apiURL}/api/v1/appointment/create/`

  await axios.post(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
    .then(async response => {
      callback();

      await dispatch({
        type: TOGGLE_MODAL,
        show: false,
        product: null
      })
      dispatch({
        type: CLEAR_PRODUCTS,
      })
      toast.success("Reserva creada exitosamente!");


    })
    .catch(error => {
      console.log(error);
      if (error.response && error.response.data && Object.values(error.response.data).length > 0) {
        toast.error(`${Object.values(error.response.data)[0]}`)
      } else {
        toast.error("Ocurrió un error al crear la reserva")
      }

    })
}

export const fetchMyAppointments = () => async (dispatch) => {
  let url = `${apiURL}/api/v1/appointment/my/`

  await axios.get(url)
    .then(response => {
      dispatch({
        type: FETCH_MY_APPOINTMENTS,
        my_appointments: response.data
      })
    })
    .catch(error => {
      try {
        toast.error(`${Object.values(error.response.data)[0]}`)
      } catch (error) {
        console.log("e", error);
      }
    })
}

export const fetchAppointments = () => async (dispatch) => {

  let url = `${apiURL}/api/v1/appointment/`
  await axios.get(url)
      .then(response => {
          dispatch({
              type: FETCH_APPOINTMENTS,
              appointments: response.data.results
          })
      })
      .catch(error => {
          toast.error(`${Object.values(error.response.data)[0]}`)
      })
}

export const updateAppointment = (formData, id) => async (dispatch) => {
  let url = `${apiURL}/api/v1/appointment/${id}/`
  await axios.put(url, formData, { headers: { 'content-type': 'multipart/form-data' } })
      .then(response => {
          dispatch({
              type: UPDATE_APPOINTMENT,
              appointment: response.data,
          })
      })
      .catch(error => {
          toast.error(`${Object.values(error.response.data)[0]}`)
      })
}

export const startAppointment = (appointment) => async (dispatch) => {
  const formData = new FormData()
  formData.append('status','EN PROCESO');
  formData.append('start_date',new Date().toISOString());
  dispatch(updateAppointment(formData, appointment.id));
}

export const denyAppointment = (appointment) => async (dispatch) => {
  const formData = new FormData()
  formData.append('status','RECHAZADA');
  dispatch(updateAppointment(formData, appointment.id));
}